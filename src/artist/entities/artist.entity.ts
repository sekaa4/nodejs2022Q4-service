import { ApiProperty } from '@nestjs/swagger';

export class Artist {
  @ApiProperty({
    type: String,
    format: 'uuid',
  })
  id: string;

  @ApiProperty({
    type: String,
    example: 'Freddie Mercury',
  })
  name: string;

  @ApiProperty({
    type: Boolean,
    example: false,
  })
  grammy: boolean;
}
