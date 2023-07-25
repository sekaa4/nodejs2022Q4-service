import { Injectable } from '@nestjs/common';
import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Track } from 'src/track/entities/track.entity';
import { User } from 'src/user/entities/user.entity';
import { Favorites } from './interface/favorites.interface';

@Injectable()
export class DatabaseService {
  private readonly users: User[] = [];
  private readonly artists: Artist[] = [];
  private readonly albums: Album[] = [];
  private readonly tracks: Track[] = [];
  private readonly favorites: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };
}
