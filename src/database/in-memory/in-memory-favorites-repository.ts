import {
  InternalServerErrorException,
  NotFoundException,
  HttpStatus,
} from '@nestjs/common';

import { Favorites } from '../interface/favorites.interface';

type Pathname = keyof Favorites;

export class InMemoryFavoriteRepository {
  private _repository: Favorites;

  constructor() {
    this._repository = {
      artists: [],
      albums: [],
      tracks: [],
    };
  }

  async create(payload: string, pathname: Pathname): Promise<boolean> {
    try {
      this._repository[pathname].push(payload);

      return true;
    } catch (error) {
      throw new InternalServerErrorException(
        'Something wrong in the server, try again later',
      );
    }
  }

  async findMany() {
    try {
      const items = { ...this._repository };

      return items;
    } catch (error) {
      throw new InternalServerErrorException(
        'Something wrong in the server, try again later',
      );
    }
  }

  async delete(payload: string, pathname: Pathname) {
    try {
      const items = this._repository[pathname];

      const indexId = items.findIndex((id) => id === payload);

      if (!~indexId) throw new NotFoundException(`${payload} not found`);

      items.splice(indexId, 1);
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) throw error;
      throw new InternalServerErrorException(
        'Something wrong in the server, try again later',
      );
    }
  }
}
