import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    type: String,
    description: "The user's login",
  })
  @IsString()
  @IsNotEmpty()
  login: string;

  @ApiProperty({
    type: String,
    format: 'password',
    description: "The user's password",
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
