import { ApiProperty } from '@nestjs/swagger';
import { CONSTANTS } from 'src/utils/constants';

export class Album {
  @ApiProperty({
    type: String,
    example: CONSTANTS.RANDOM_UUID,
  })
  id: string;

  @ApiProperty({
    type: String,
  })
  name: string;

  @ApiProperty({
    type: Number,
  })
  year: number;

  @ApiProperty({
    type: String,
    nullable: true,
    example: CONSTANTS.RANDOM_UUID,
  })
  artistId: string | null;
}
