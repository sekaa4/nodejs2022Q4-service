import { UpdateAlbumDto } from 'src/album/dto/update-album.dto';
import { Album } from 'src/album/entities/album.entity';
import { UpdateArtistDto } from 'src/artist/dto/update-artist.dto';
import { Artist } from 'src/artist/entities/artist.entity';
import { UpdateTrackDto } from 'src/track/dto/update-track.dto';
import { Track } from 'src/track/entities/track.entity';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { User } from 'src/user/entities/user.entity';

export type PayLoad =
  | UpdateUserDto
  | UpdateArtistDto
  | UpdateAlbumDto
  | UpdateTrackDto;

export type Entity = Artist | Track | Album | User;

export abstract class IGenericRepository<T extends Entity, K extends PayLoad> {
  abstract create: (payload: T) => Promise<T>;
  abstract findMany: () => Promise<T[]>;
  abstract findUnique: (id: string) => Promise<T>;
  abstract update: (id: string, payload: K) => Promise<T>;
  abstract delete: (id: string) => void;
}
