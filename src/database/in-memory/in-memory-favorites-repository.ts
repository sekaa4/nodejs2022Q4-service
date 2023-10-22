import {
  InternalServerErrorException,
  NotFoundException,
  HttpStatus,
} from '@nestjs/common';

import { Favorites } from '../interface/favorites.interface';
import { Pathname } from '../interface/pathname.type';

export class InMemoryFavoriteRepository {
  private _repository: Favorites;

  constructor() {
    this._repository = {
      artists: [],
      albums: [],
      tracks: [],
    };
  }

  async create(id: string, pathname: Pathname): Promise<boolean> {
    try {
      this._repository[pathname].push(id);

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

  async delete(id: string, pathname: Pathname) {
    try {
      const items = this._repository[pathname];

      const indexId = items.findIndex((itemId) => itemId === id);

      if (!~indexId)
        throw new NotFoundException(
          `${pathname[0].toUpperCase() + pathname.slice(1, -1)} was not found`,
        );

      items.splice(indexId, 1);
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) throw error;
      throw new InternalServerErrorException(
        'Something wrong in the server, try again later',
      );
    }
  }

  async deleteId(id: string, pathname: Pathname) {
    try {
      const items = this._repository[pathname];

      const indexId = items.findIndex((itemId) => itemId === id);

      if (~indexId) items.splice(indexId, 1);
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) throw error;
      throw new InternalServerErrorException(
        'Something wrong in the server, try again later',
      );
    }
  }
}
