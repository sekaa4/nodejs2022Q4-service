import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsUUID,
  ValidateIf,
} from 'class-validator';
import { CreateTrackDto } from './create-track.dto';

export class UpdateTrackDto extends PartialType(CreateTrackDto) {
  @ApiProperty({
    type: String,
    example: 'Bohemian Rhapsody',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: String,
    format: 'uuid',
    nullable: true,
  })
  @IsUUID()
  @ValidateIf((_object, value) => value !== null)
  artistId: string | null;

  @ApiProperty({
    type: String,
    format: 'uuid',
    nullable: true,
  })
  @IsUUID()
  @ValidateIf((_object, value) => value !== null)
  albumId: string | null;

  @ApiProperty({
    type: 'integer',
    description: 'In seconds',
    example: 355,
  })
  @IsInt()
  @IsNotEmpty()
  duration: number;
}
