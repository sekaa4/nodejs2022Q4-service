import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsUUID,
  ValidateIf,
} from 'class-validator';
import { CreateAlbumDto } from './create-album.dto';

export class UpdateAlbumDto extends PartialType(CreateAlbumDto) {
  @ApiProperty({
    type: String,
    example: 'Innuendo',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: 'integer',
    example: 1991,
  })
  @IsNumber()
  @IsNotEmpty()
  year: number;

  @ApiProperty({
    type: String,
    format: 'uuid',
    nullable: true,
  })
  @IsUUID()
  @ValidateIf((_object, value) => value !== null)
  artistId: string | null;
}
