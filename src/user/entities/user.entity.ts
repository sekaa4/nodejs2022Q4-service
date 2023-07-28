import { ApiProperty } from '@nestjs/swagger';
import { CONSTANTS } from 'src/utils/constants';

export class User {
  @ApiProperty({
    type: String,
    example: CONSTANTS.RANDOM_UUID,
  })
  id: string;

  @ApiProperty({
    type: String,
  })
  login: string;

  @ApiProperty({
    type: 'integer',
  })
  version: number;

  @ApiProperty({
    type: Number,
  })
  createdAt: number;

  @ApiProperty({
    type: Number,
  })
  updatedAt: number;

  password: string;
}
