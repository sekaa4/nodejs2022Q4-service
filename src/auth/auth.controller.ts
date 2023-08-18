import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import {
  ApiOperation,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiTags,
  ApiOkResponse,
  ApiForbiddenResponse,
} from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';

import { AuthService } from './auth.service';
import { CreateAuthUserDto } from './dto/create-auth.dto';
import { UpdateAuthUserDto } from './dto/update-auth.dto';
import { Auth } from './entities/auth.entity';
import { RefreshRequest } from './types/refresh-request';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiTags('Signup')
  @ApiOperation({ description: 'Create a new user', summary: 'Create user' })
  @ApiCreatedResponse({
    description: 'The user has been created',
    type: User,
  })
  @ApiBadRequestResponse({
    description: 'Bad request, body does not contain required fields',
  })
  @ApiForbiddenResponse({
    description:
      'Registration failed, user with such login exist, credentials taken',
  })
  @Post('/signup')
  async signUp(@Body() createAuthUserDto: CreateAuthUserDto) {
    const user = await this.authService.signUp(createAuthUserDto);
    return new User(user);
  }

  @ApiTags('Login')
  @ApiOperation({ description: 'Login user', summary: 'Login user' })
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
  @Post('/login')
  async signIn(@Body() createAuthUserDto: CreateAuthUserDto) {
    const response = await this.authService.signIn(createAuthUserDto);

    return response;
  }

  @ApiTags('Refresh token')
  @ApiOperation({
    description: 'Get new pair of Access token and Refresh token',
    summary: 'New pair of Access token and Refresh token',
  })
  @ApiOkResponse({
    description: 'New pair of Access token and Refresh token created',
    type: Auth,
  })
  //401
  @ApiBadRequestResponse({
    description:
      'Bad request, body does not contain required fields, no refreshToken in body',
  })
  @ApiForbiddenResponse({
    description: 'Authentication failed, Refresh token is invalid or expired',
  })
  @UseGuards(AuthGuard)
  @Post('/refresh')
  async refreshTokens(
    @Body() updateAuthDto: UpdateAuthUserDto,
    @Req() req: RefreshRequest,
  ) {
    const response = await this.authService.refreshTokens(
      updateAuthDto,
      req.user,
    );

    return response;
  }
}
