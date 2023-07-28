import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsUUID,
  ValidateIf,
} from 'class-validator';
import { CONSTANTS } from 'src/utils/constants';

export class CreateAlbumDto {
  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: Number,
    description: 'This is a required property',
  })
  @IsNumber()
  @IsNotEmpty()
  year: number;

  @ApiProperty({
    type: String,
    nullable: true,
    description: 'This is a required property',
    example: CONSTANTS.RANDOM_UUID,
  })
  @IsUUID()
  @ValidateIf((_object, value) => value !== null)
  artistId: string | null;
}
