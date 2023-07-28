import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';
import { CreateArtistDto } from './create-artist.dto';

export class UpdateArtistDto extends PartialType(CreateArtistDto) {
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
