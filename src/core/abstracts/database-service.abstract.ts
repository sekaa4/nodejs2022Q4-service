import { CreateAlbumDto } from 'src/album/dto/create-album.dto';
import { Album } from 'src/album/entities/album.entity';
import { CreateArtistDto } from 'src/artist/dto/create-artist.dto';
import { Artist } from 'src/artist/entities/artist.entity';
import { Favorites } from 'src/database/interface/favorites.interface';
import { CreateTrackDto } from 'src/track/dto/create-track.dto';
import { Track } from 'src/track/entities/track.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { User } from 'src/user/entities/user.entity';
import { IGenericRepository } from './generic-repository.abstract';

export abstract class IDatabaseService {
  readonly users: IGenericRepository<User, UpdateUserDto>;
  readonly artists: IGenericRepository<Artist, CreateArtistDto>;
  readonly albums: IGenericRepository<Album, CreateAlbumDto>;
  readonly tracks: IGenericRepository<Track, CreateTrackDto>;
  // readonly favorites: IGenericRepository<Favorites, Artist | Album | Track>;

  // Favorites = {
  //   artists: [],
  //   albums: [],
  //   tracks: [],
  // };
}
