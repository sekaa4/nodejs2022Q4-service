import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiTags,
  ApiOkResponse,
  ApiForbiddenResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiUnauthorizedResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';

import { AuthService } from './auth.service';
import { CreateAuthUserDto } from './dto/create-auth.dto';
import { UpdateAuthUserDto } from './dto/update-auth.dto';
import { Auth } from './entities/auth.entity';
import { AuthRefreshGuard } from './guard/auth-refresh.guard';
import { RefreshRequest } from './types/refresh-request';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiTags('Signup')
  @ApiOperation({ description: 'Signup a user', summary: 'Signup a user' })
  @ApiCreatedResponse({
    description: 'The user has been created',
    type: User,
  })
  @ApiBadRequestResponse({
    description: 'Bad request, body does not contain required fields',
  })
  @ApiConflictResponse({
    description:
      'Registration failed, user with such login exist, credentials taken',
  })
  @Post('/signup')
  async signUp(@Body() createAuthUserDto: CreateAuthUserDto) {
    const user = await this.authService.signUp(createAuthUserDto);
    return new User(user);
  }

  @ApiTags('Login')
  @ApiOperation({
    description: 'Logins a user and returns a JWT-token',
    summary: 'Login user',
  })
  @ApiOkResponse({
    description: 'The user has been logged.',
    type: Auth,
  })
  @ApiBadRequestResponse({
    description: 'Bad request, body does not contain required fields',
  })
  @ApiForbiddenResponse({
    description:
      "Authentication failed, no user with such login, password doesn't match actual one, etc.",
  })
  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async signIn(@Body() createAuthUserDto: CreateAuthUserDto) {
    const response = await this.authService.signIn(createAuthUserDto);

    return response;
  }

  @ApiTags('Refresh token')
  @ApiBearerAuth()
  @ApiOperation({
    description: 'Get new pair of Access token and Refresh token',
    summary: 'New pair of Access token and Refresh token',
  })
  @ApiOkResponse({
    description: 'New pair of Access token and Refresh token created',
    type: Auth,
  })
  @ApiUnauthorizedResponse({
    description:
      'Bad request, body does not contain required fields, no refreshToken in body',
  })
  @ApiForbiddenResponse({
    description: 'Authentication failed, Refresh token is invalid or expired',
  })
  @UseGuards(AuthRefreshGuard)
  @HttpCode(HttpStatus.OK)
  @Post('/refresh')
  async refreshTokens(
    @Body() updateAuthUserDto: UpdateAuthUserDto,
    @Req() req: RefreshRequest,
  ) {
    const response = await this.authService.refreshTokens(req.user);

    return response;
  }
}
