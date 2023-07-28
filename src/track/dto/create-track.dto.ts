import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';
import { CONSTANTS } from 'src/utils/constants';

export class CreateTrackDto {
  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: String,
    nullable: true,
    description: 'This is a required property',
    example: CONSTANTS.RANDOM_UUID,
  })
  @IsUUID()
  @ValidateIf((_object, value) => value !== null)
  artistId: string | null;

  @ApiProperty({
    type: String || 'null',
    description: 'This is a required property',
    example: CONSTANTS.RANDOM_UUID,
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
