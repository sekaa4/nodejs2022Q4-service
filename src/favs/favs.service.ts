import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Injectable()
export class FavsService {
  #favoritesId: number;
  constructor(private readonly databaseService: PrismaService) {
    this.#favoritesId = 2023;
  }

  async findAll() {
    const favs = await this.databaseService.favorites.findMany({
      where: {
        id: this.#favoritesId,
      },
      include: {
        albums: {
          select: {
            album: true,
          },
        },
        tracks: {
          select: {
            track: true,
          },
        },
        artists: {
          select: {
            artist: true,
          },
        },
      },
    });

    if (favs.length === 0)
      return await this.databaseService.favorites.create({
        select: {
          albums: true,
          tracks: true,
          artists: true,
        },
      });

    if (Array.isArray(favs)) {
      const favorites = favs[0];
      return {
        artists: favorites.artists.map((artistInfo) => artistInfo.artist),
        albums: favorites.albums.map((albumInfo) => albumInfo.album),
        tracks: favorites.tracks.map((trackInfo) => trackInfo.track),
      };
    }

    return favs;
  }

  async createArtist(id: string): Promise<string> {
    try {
      await this.databaseService.favorites.findMany();
      await this.databaseService.artistToFavorite.create({
        data: {
          favoritesId: this.#favoritesId,
          artistId: id,
        },
      });

      return 'Add artist to the favorites';
    } catch (error) {
      console.log('error', error);
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2003'
      ) {
        throw new UnprocessableEntityException(`Artist was not found`);
      } else throw error;
    }
  }

  async removeArtist(id: string) {
    try {
      await this.databaseService.artistToFavorite.delete({
        where: {
          artistId: id,
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Artist was not found`);
      } else throw error;
    }
  }

  async createAlbum(id: string): Promise<string> {
    try {
      await this.databaseService.favorites.findMany();
      await this.databaseService.albumToFavorite.create({
        data: {
          favoritesId: this.#favoritesId,
          albumId: id,
        },
      });

      return 'Add album to the favorites';
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2003'
      ) {
        throw new UnprocessableEntityException(`Artist was not found`);
      } else throw error;
    }
  }

  async removeAlbum(id: string) {
    try {
      await this.databaseService.albumToFavorite.delete({
        where: {
          albumId: id,
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Album was not found`);
      } else throw error;
    }
  }

  async createTrack(id: string): Promise<string> {
    try {
      await this.databaseService.favorites.findMany();
      await this.databaseService.trackToFavorite.create({
        data: {
          favoritesId: this.#favoritesId,
          trackId: id,
        },
      });

      return 'Add track to the favorites';
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2003'
      ) {
        throw new UnprocessableEntityException(`Artist was not found`);
      } else throw error;
    }
  }

  async removeTrack(id: string) {
    try {
      await this.databaseService.trackToFavorite.delete({
        where: {
          trackId: id,
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Track was not found`);
      } else throw error;
    }
  }
}
