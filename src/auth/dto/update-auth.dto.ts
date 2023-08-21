import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateAuthUserDto {
  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}
