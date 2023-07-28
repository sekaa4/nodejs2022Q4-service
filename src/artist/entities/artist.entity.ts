import { ApiProperty } from '@nestjs/swagger';
import { CONSTANTS } from 'src/utils/constants';

export class Artist {
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
    type: Boolean,
  })
  grammy: boolean;
}
