import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { DatabaseService } from 'src/database/database.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    const albumPayload = {
      id: uuid(),
      ...createAlbumDto,
    };

    const albums = await this.databaseService.albums.create(albumPayload);

    return albums;
  }

  async findAll() {
    const albums = await this.databaseService.albums.findMany();

    return albums;
  }

  async findOne(id: string) {
    const user = await this.databaseService.albums.findUnique(id);

    return user;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = await this.databaseService.albums.update(id, updateAlbumDto);

    return album;
  }

  async remove(id: string) {
    return this.databaseService.albums.delete(id);
  }
}
