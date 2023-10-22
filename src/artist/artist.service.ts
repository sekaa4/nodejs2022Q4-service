import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistService {
  constructor(private readonly databaseService: PrismaService) {}

  async create(createArtistDto: CreateArtistDto): Promise<Artist> {
    const artist = await this.databaseService.artist.create({
      data: createArtistDto,
    });

    return artist;
  }

  async findAll() {
    const artists = await this.databaseService.artist.findMany();

    return artists;
  }

  async findOne(id: string) {
    const artist = await this.databaseService.artist.findUnique({
      where: { id },
    });

    if (!artist) throw new NotFoundException(`Artist was not found`);

    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    try {
      return await this.databaseService.artist.update({
        where: { id: id },
        data: updateArtistDto,
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

  async remove(id: string) {
    try {
      await this.databaseService.artist.delete({
        where: {
          id,
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
}
