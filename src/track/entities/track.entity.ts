import { ApiProperty } from '@nestjs/swagger';

export class Track {
  @ApiProperty({
    type: String,
    format: 'uuid',
  })
  id: string;

  @ApiProperty({
    type: String,
    example: 'The Show Must Go On',
  })
  name: string;

  @ApiProperty({
    type: String,
    nullable: true,
    format: 'uuid',
  })
  artistId: string | null;

  @ApiProperty({
    type: String,
    nullable: true,
    format: 'uuid',
  })
  albumId: string | null;

  @ApiProperty({
    type: 'integer',
    description: 'In seconds',
    example: 262,
  })
  duration: number;
}
