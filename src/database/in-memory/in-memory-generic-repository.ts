import {
  InternalServerErrorException,
  NotFoundException,
  HttpStatus,
  ForbiddenException,
} from '@nestjs/common';
import { UpdateAlbumDto } from 'src/album/dto/update-album.dto';
import { UpdateArtistDto } from 'src/artist/dto/update-artist.dto';
import {
  Entity,
  IGenericRepository,
  PayLoad,
} from 'src/core/abstracts/generic-repository.abstract';
import { UpdateTrackDto } from 'src/track/dto/update-track.dto';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { User } from 'src/user/entities/user.entity';

export class InMemoryGenericRepository<T extends Entity, K extends PayLoad>
  implements IGenericRepository<T, K>
{
  constructor(
    private repository: T[],
    private name: string,
  ) {}

  async create(payload: T): Promise<T> {
    try {
      this.repository.push({ ...payload });

      return payload;
    } catch (error) {
      throw new InternalServerErrorException(
        'Something wrong in the server, try again later',
      );
    }
  }

  async findMany() {
    try {
      const items = [...this.repository];

      return items;
    } catch (error) {
      throw new InternalServerErrorException(
        'Something wrong in the server, try again later',
      );
    }
  }

  async findUnique(id: string) {
    try {
      const items = [...this.repository];

      const item = items.find((item) => item.id === id);

      return item;
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) throw error;

      throw new InternalServerErrorException(
        'Something wrong in the server, try again later',
      );
    }
  }

  async update(
    id: string,
    payload: UpdateUserDto | UpdateArtistDto | UpdateAlbumDto | UpdateTrackDto,
  ) {
    try {
      if ('newPassword' in payload) {
        const { newPassword, oldPassword } = payload;
        const users = this.repository as unknown as User[];
        const user = users.find((user) => user.id === id);

        if (!user) throw new NotFoundException(`User was not found`);

        if (user.password === oldPassword) {
          user.password = newPassword;
          user.updatedAt = Date.now();
          user.version++;

          return { ...user } as unknown as T;
        }

        throw new ForbiddenException(`User oldPassword is wrong`);
      }

      const items = this.repository;
      const itemIndex = items.findIndex((item) => item.id === id);
      if (!~itemIndex)
        throw new NotFoundException(`${this.name} was not found`);

      items[itemIndex] = { ...items[itemIndex], ...payload };

      return items[itemIndex];
    } catch (error) {
      if (
        error.status === HttpStatus.NOT_FOUND ||
        error.status === HttpStatus.FORBIDDEN
      )
        throw error;

      throw new InternalServerErrorException(
        'Something wrong in the server, try again later',
      );
    }
  }

  async delete(id: string) {
    try {
      const items = this.repository;
      const itemIndex = items.findIndex((item) => item.id === id);
      if (!~itemIndex)
        throw new NotFoundException(`${this.name} was not found`);

      items.splice(itemIndex, 1);
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) throw error;
      throw new InternalServerErrorException(
        'Something wrong in the server, try again later',
      );
    }
  }

  async updateField(id: string) {
    const items = this.repository;

    items.forEach((item) => {
      const entries = Object.entries(item);
      entries.forEach(([key, value]) => {
        if ((key === 'artistId' || key === 'albumId') && value === id) {
          item[key] = null;
        }
      });
    });
  }
}
