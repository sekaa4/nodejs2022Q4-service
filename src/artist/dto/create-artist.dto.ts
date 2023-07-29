import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateArtistDto {
  @ApiProperty({
    type: String,
    example: 'Freddie Mercury',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: Boolean,
    example: false,
  })
  @IsBoolean()
  @IsNotEmpty()
  grammy: boolean;
}
