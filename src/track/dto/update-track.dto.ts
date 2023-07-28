import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsUUID,
  ValidateIf,
} from 'class-validator';
import { CONSTANTS } from 'src/utils/constants';
import { CreateTrackDto } from './create-track.dto';

export class UpdateTrackDto extends PartialType(CreateTrackDto) {
  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: String,
    example: CONSTANTS.RANDOM_UUID,
    description: 'This is a required property',
  })
  @IsUUID()
  @ValidateIf((_object, value) => value !== null)
  artistId: string | null;

  @ApiProperty({
    type: String,
    example: CONSTANTS.RANDOM_UUID,
    description: 'This is a required property',
  })
  @IsUUID()
  @ValidateIf((_object, value) => value !== null)
  albumId: string | null;

  @ApiProperty({
    type: 'integer',
    description: 'This is a required property',
  })
  @IsInt()
  @IsNotEmpty()
  duration: number;
}
