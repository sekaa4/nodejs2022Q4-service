import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthRefreshGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromBody(request);

    if (!token) {
      throw new UnauthorizedException(
        'Bad request, body does not contain required fields, no refreshToken in body',
      );
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get('JWT_SECRET_REFRESH_KEY'),
      });

      request['user'] = payload;
    } catch (error) {
      throw new ForbiddenException(
        'Authentication failed, Refresh token is invalid or expired',
      );
    }

    return true;
  }

  private extractTokenFromBody(request: Request): string | undefined {
    const token = request.body?.refreshToken;
    return token;
  }
}
