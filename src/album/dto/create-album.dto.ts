import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsUUID,
  ValidateIf,
} from 'class-validator';

export class CreateAlbumDto {
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
