import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { v4 as uuid } from 'uuid';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createArtistDto: CreateArtistDto): Promise<Artist> {
    const artistPayload = {
      id: uuid(),
      ...createArtistDto,
    };

    const track = await this.databaseService.artists.create(artistPayload);

    return track;
  }

  async findAll() {
    const artists = await this.databaseService.artists.findMany();

    return artists;
  }

  async findOne(id: string) {
    const artist = await this.databaseService.artists.findUnique(id);

    if (!artist)
      throw new NotFoundException(`Artist with id: <${id}> not found`);

    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const user = await this.databaseService.artists.update(id, updateArtistDto);

    return user;
  }

  async remove(id: string) {
    return this.databaseService.artists.delete(id);
  }
}
