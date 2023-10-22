import { Request } from 'express';
import { Payload } from './payload';

export interface TokenExpire extends Payload {
  iat: number;
  exp: number;
}

export interface RefreshRequest extends Request {
  user: TokenExpire;
}
