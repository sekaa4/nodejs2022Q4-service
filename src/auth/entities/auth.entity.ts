import { ApiProperty } from '@nestjs/swagger';

export class Auth {
  @ApiProperty({
    type: String,
    format: 'hash',
  })
  accessToken: string;

  @ApiProperty({
    type: String,
    format: 'hash',
  })
  refreshToken: string;
}
