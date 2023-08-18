import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { CreateAuthUserDto } from './dto/create-auth.dto';
import { UpdateAuthUserDto } from './dto/update-auth.dto';
import { ConfigService } from '@nestjs/config';
import { TokenExpire } from './types/refresh-request';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(createAuthUserDto: CreateAuthUserDto) {
    try {
      const { login, password } = createAuthUserDto;
      const hashPassword = await bcrypt.hash(password, +process.env.CRYPT_SALT);
      const createUserDto = { login, password: hashPassword };

      return await this.userService.create(createUserDto);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ForbiddenException(
          `Registration failed, user with such login exist, credentials taken`,
        );
      } else throw error;
    }
  }

  async signIn(createAuthUserDto: CreateAuthUserDto) {
    const { login, password } = createAuthUserDto;

    const user = await this.userService.findOneWithLogin(login);

    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if (isCorrectPassword) {
      const payload = { login: user.login, userId: user.id };
      const [accessToken, refreshToken] = await Promise.all([
        this.jwtService.signAsync(payload),
        this.jwtService.signAsync(payload, {
          expiresIn: this.configService.get('TOKEN_REFRESH_EXPIRE_TIME'),
          secret: this.configService.get('JWT_SECRET_REFRESH_KEY'),
        }),
      ]);
      return {
        accessToken,
        refreshToken,
      };
    }

    throw new ForbiddenException(
      `Authentication failed, no user with such password doesn't match actual one, etc.`,
    );
  }

  async refreshTokens(
    updateAuthUserDto: UpdateAuthUserDto,
    accessPayload: TokenExpire,
  ) {
    const { refreshToken } = updateAuthUserDto;

    if (!refreshToken)
      throw new UnauthorizedException(
        'Bad request, body does not contain required fields, no refreshToken in body',
      );

    try {
      const payload: TokenExpire = await this.jwtService.verifyAsync(
        refreshToken,
        {
          secret: this.configService.get('JWT_SECRET_REFRESH_KEY'),
        },
      );

      if (
        accessPayload.login === payload.login &&
        accessPayload.userId === payload.userId
      ) {
        const newPayload = { login: payload.login, userId: payload.userId };
        const [accessToken, refreshToken] = await Promise.all([
          this.jwtService.signAsync(newPayload),
          this.jwtService.signAsync(newPayload, {
            expiresIn: this.configService.get('TOKEN_REFRESH_EXPIRE_TIME'),
            secret: this.configService.get('JWT_SECRET_REFRESH_KEY'),
          }),
        ]);

        return {
          accessToken,
          refreshToken,
        };
      }

      throw new UnauthorizedException();
    } catch (error) {
      throw new ForbiddenException(
        'Authentication failed, Refresh token is invalid or expired',
      );
    }
  }
}
