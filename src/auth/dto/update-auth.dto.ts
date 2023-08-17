import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
import { CreateAuthUserDto } from './create-auth.dto';

export class UpdateAuthUserDto extends PartialType(CreateAuthUserDto) {
  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}
