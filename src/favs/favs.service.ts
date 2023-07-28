import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Favorites } from 'src/database/interface/favorites.interface';

type Pathname = keyof Favorites;

@Injectable()
export class FavsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(id: string, path: Pathname): Promise<string> {
    const favs = await this.databaseService.create(id, path);

    return favs;
  }

  async findAll() {
    const favs = await this.databaseService.findMany();

    return favs;
  }

  async remove(id: string, path: Pathname) {
    return this.databaseService.favorites.delete(id, path);
  }
}
