import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateArtistDto {
  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: Boolean,
    description: 'This is a required property',
  })
  @IsBoolean()
  @IsNotEmpty()
  grammy: boolean;
}
