import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { CreateAuthUserDto } from './dto/create-auth.dto';
import { UpdateAuthUserDto } from './dto/update-auth.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async signUp(createAuthDto: CreateUserDto) {
    await this.userService.create(createAuthDto);

    return 'The user has been created';
  }

  async signIn(createAuthUserDto: CreateAuthUserDto) {
    // const tokensObj = await
    // await this.userService.create(createAuthDto);
    // return tokensObj;
  }

  async refreshTokens(updateAuthUserDto: UpdateAuthUserDto) {
    // await this.userService.create(createAuthDto);

    return 'This action return tocken';
  }

  // findAll() {
  //   return `This action returns all auth`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} auth`;
  // }

  // update(id: number, updateAuthDto: UpdateAuthDto) {
  //   return `This action updates a #${id} auth`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} auth`;
  // }
}
