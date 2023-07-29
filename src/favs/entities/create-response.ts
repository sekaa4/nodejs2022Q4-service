import { ApiProperty } from '@nestjs/swagger';

export class CreateResponse {
  @ApiProperty({
    type: String,
  })
  message: string;
}
