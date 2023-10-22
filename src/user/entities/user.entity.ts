import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Transform } from 'class-transformer';

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
  @Transform(({ value }) => new Date(value).getTime())
  createdAt: number | Date;

  @ApiProperty({
    type: Number,
    example: 1655000000,
  })
  @Transform(({ value }) => new Date(value).getTime())
  updatedAt: number | Date;

  @Exclude()
  password: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
