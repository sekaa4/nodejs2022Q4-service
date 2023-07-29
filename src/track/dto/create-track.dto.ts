import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';

export class CreateTrackDto {
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
  })
  @IsInt()
  @IsNotEmpty()
  duration: number;
}
