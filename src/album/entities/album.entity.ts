import { ApiProperty } from '@nestjs/swagger';

export class Album {
  @ApiProperty({
    type: String,
    format: 'uuid',
  })
  id: string;

  @ApiProperty({
    type: String,
    example: 'Innuendo',
  })
  name: string;

  @ApiProperty({
    type: 'integer',
    example: 1991,
  })
  year: number;

  @ApiProperty({
    type: String,
    nullable: true,
    format: 'uuid',
  })
  artistId: string | null;
}
