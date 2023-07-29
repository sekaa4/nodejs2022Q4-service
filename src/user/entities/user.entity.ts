import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty({
    type: String,
    format: 'uuid',
  })
  id: string;

  @ApiProperty({
    type: String,
    example: 'TestUser',
  })
  login: string;

  @ApiProperty({
    type: 'integer',
    example: 1,
  })
  version: number;

  @ApiProperty({
    type: Number,
    example: 1655000000,
  })
  createdAt: number;

  @ApiProperty({
    type: Number,
    example: 1655000000,
  })
  updatedAt: number;

  password: string;
}
