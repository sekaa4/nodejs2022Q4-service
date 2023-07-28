import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty({
    type: String,
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
