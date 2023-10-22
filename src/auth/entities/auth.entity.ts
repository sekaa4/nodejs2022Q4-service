import { ApiProperty } from '@nestjs/swagger';

export class Auth {
  @ApiProperty({
    type: String,
    description: 'JWT Access Token',
  })
  accessToken: string;

  @ApiProperty({
    type: String,
    description: 'JWT Refresh Token',
  })
  refreshToken: string;
}
