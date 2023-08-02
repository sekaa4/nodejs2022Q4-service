import { BadRequestException } from '@nestjs/common';
import { validate } from 'uuid';

export const validateUUID = (payload: unknown, path: string): true => {
  if (typeof payload === 'string') {
    const isUUID = validate(payload);

    if (!isUUID)
      throw new BadRequestException(`${path} ${payload} is invalid(not uuid)`);
    return isUUID;
  }

  throw new BadRequestException(`${payload} should be a string`);
};
