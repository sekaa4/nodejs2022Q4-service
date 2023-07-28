import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { DatabaseService } from 'src/database/database.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';

@Injectable()
export class TrackService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createTrackDto: CreateTrackDto): Promise<Track> {
    const trackPayload = {
      id: uuid(),
      ...createTrackDto,
    };

    const track = await this.databaseService.tracks.create(trackPayload);

    return track;
  }

  async findAll() {
    const tracks = await this.databaseService.tracks.findMany();

    return tracks;
  }

  async findOne(id: string) {
    const track = await this.databaseService.tracks.findUnique(id);

    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = await this.databaseService.tracks.update(id, updateTrackDto);

    return track;
  }

  async remove(id: string) {
    return this.databaseService.tracks.delete(id);
  }
}
