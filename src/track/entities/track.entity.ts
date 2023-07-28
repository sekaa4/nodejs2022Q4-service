import { ApiProperty } from '@nestjs/swagger';
import { CONSTANTS } from 'src/utils/constants';

export class Track {
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
    type: String,
    nullable: true,
    example: CONSTANTS.RANDOM_UUID,
  })
  artistId: string | null;

  @ApiProperty({
    type: String,
    nullable: true,
    example: CONSTANTS.RANDOM_UUID,
  })
  albumId: string | null;

  @ApiProperty({
    type: 'integer',
  })
  duration: number;
}
