import { UpdateAlbumDto } from 'src/album/dto/update-album.dto';
import { Album } from 'src/album/entities/album.entity';
import { UpdateArtistDto } from 'src/artist/dto/update-artist.dto';
import { Artist } from 'src/artist/entities/artist.entity';
import { UpdateTrackDto } from 'src/track/dto/update-track.dto';
import { Track } from 'src/track/entities/track.entity';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { User } from 'src/user/entities/user.entity';

type PayLoad =
  | UpdateUserDto
  | UpdateArtistDto
  | UpdateAlbumDto
  | UpdateTrackDto;

type Entity = Artist | Track | Album | User;

export abstract class IGenericRepository<T extends Entity, K extends PayLoad> {
  abstract create: (payload: T) => Promise<T>;
  abstract findMany: () => Promise<T[]>;
  abstract findUnique: (id: string) => Promise<T>;
  abstract update: (id: string, payload: K) => Promise<T>;
  abstract delete: (id: string) => void;
  // async addUser(user: User): Promise<UserResp> {
  //   try {
  //     this.users.push({ ...user });
  //     delete user.password;
  //     return user;
  //   } catch (error) {
  //     throw new InternalServerErrorException(
  //       'Can not add user, try again later',
  //     );
  //   }
  // }
  // async findAllUser() {
  //   try {
  //     const users = [...this.users];
  //     const resUsers = users.map((user) => {
  //       delete user.password;
  //       return user;
  //     });
  //     return resUsers;
  //   } catch (error) {
  //     throw new InternalServerErrorException(
  //       'Something wrong, try again later',
  //     );
  //   }
  // }
  // async findOneUser(id: string) {
  //   try {
  //     const users = [...this.users];
  //     const resUser = users.find((user) => user.id === id);
  //     if (!resUser) throw new NotFoundException(`User ${id} not found`);
  //     return resUser;
  //   } catch (error) {
  //     if (error.status === HttpStatus.NOT_FOUND) throw error;
  //     throw new InternalServerErrorException(
  //       'Something wrong, try again later',
  //     );
  //   }
  // }
  // async updateUser(id: string, payload: UpdateUserDto) {
  //   try {
  //     const { newPassword, oldPassword } = payload;
  //     const users = this.users;
  //     const user = users.find((user) => user.id === id);
  //     if (!user) throw new NotFoundException(`User ${id} not found`);
  //     if (user.password === oldPassword) {
  //       user.password = newPassword;
  //       user.updatedAt = Date.now();
  //       user.version++;
  //       return { ...user };
  //     }
  //     throw new ForbiddenException(
  //       `User ${id} with oldPassword "${oldPassword}" is wrong, please enter correct password`,
  //     );
  //   } catch (error) {
  //     if (
  //       error.status === HttpStatus.NOT_FOUND ||
  //       error.status === HttpStatus.FORBIDDEN
  //     )
  //       throw error;
  //     throw new InternalServerErrorException(
  //       'Something wrong in the server, try again later',
  //     );
  //   }
  // }
  // async remove(id: string) {
  //   try {
  //     const users = this.users;
  //     const userIndex = users.findIndex((user) => user.id === id);
  //     if (!~userIndex) throw new NotFoundException(`User ${id} not found`);
  //     users.splice(userIndex, 1);
  //   } catch (error) {
  //     if (error.status === HttpStatus.NOT_FOUND) throw error;
  //     throw new InternalServerErrorException(
  //       'Something wrong in the server, try again later',
  //     );
  //   }
  // }
}
