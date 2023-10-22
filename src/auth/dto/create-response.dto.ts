import { ApiProperty } from '@nestjs/swagger';

export class CreateResponseAuthDto {
  @ApiProperty({
    type: String,
  })
  message: string;
}
