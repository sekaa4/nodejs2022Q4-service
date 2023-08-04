import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class AlbumService {
  constructor(private readonly databaseService: PrismaService) {}

  async create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    return await this.databaseService.album.create({
      data: createAlbumDto,
    });
  }

  async findAll() {
    return await this.databaseService.album.findMany();
  }

  async findOne(id: string) {
    const user = await this.databaseService.album.findUnique({
      where: { id },
    });

    if (!user) throw new NotFoundException(`Album was not found`);

    return user;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    try {
      return await this.databaseService.album.update({
        where: { id },
        data: updateAlbumDto,
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

  async remove(id: string) {
    try {
      await this.databaseService.album.delete({
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
