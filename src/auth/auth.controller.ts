import { Controller, Post, Body } from '@nestjs/common';
import {
  ApiOperation,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiTags,
  ApiOkResponse,
  ApiForbiddenResponse,
} from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { CreateAuthUserDto } from './dto/create-auth.dto';
import { CreateResponseAuthDto } from './dto/create-response.dto';
import { UpdateAuthUserDto } from './dto/update-auth.dto';
import { Auth } from './entities/auth.entity';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ description: 'Create a new user', summary: 'Create user' })
  @ApiCreatedResponse({
    description: 'The user has been created',
    type: CreateResponseAuthDto,
  })
  @ApiBadRequestResponse({
    description: 'Bad request, body does not contain required fields',
  })
  @Post('/signup')
  async signUp(@Body() createAuthUserDto: CreateAuthUserDto) {
    const message = await this.authService.signUp(createAuthUserDto);
    const response = { message };

    return response;
  }

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
    const message = await this.authService.signIn(createAuthUserDto);
    const response = { message };

    return response;
  }

  @ApiOperation({
    description: 'Get new pair of Access token and Refresh token',
    summary: 'New pair of Access token and Refresh token',
  })
  @ApiOkResponse({
    description: 'New pair of Access token and Refresh token created',
    type: String,
  })
  //401
  @ApiBadRequestResponse({
    description:
      'Bad request, body does not contain required fields, no refreshToken in body',
  })
  @ApiForbiddenResponse({
    description: 'Authentication failed, Refresh token is invalid or expired',
  })
  @Post('/refresh')
  async refreshTokens(@Body() updateAuthDto: UpdateAuthUserDto) {
    const message = await this.authService.refreshTokens(updateAuthDto);
    const response = { message };

    return response;
  }

  // @Get()
  // findAll() {
  //   return this.authService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.authService.findOne(+id);
  // }
}
