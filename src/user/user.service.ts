import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { DatabaseService } from 'src/database/database.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { validateUUID } from 'src/utils/validateUUID';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createUserDto: CreateUserDto): Promise<Omit<User, 'password'>> {
    const user = {
      id: uuid(),
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      ...createUserDto,
    };

    return await this.databaseService.addUser(user);
  }

  async findAll() {
    return this.databaseService.findAllUser();
  }

  async findOne(id: string) {
    validateUUID(id, 'User');

    const user = await this.databaseService.findOneUser(id);

    delete user.password;
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    validateUUID(id, 'User');

    const user = await this.databaseService.updateUser(id, updateUserDto);

    delete user.password;
    return user;
  }

  async remove(id: string) {
    validateUUID(id, 'User');
    return await this.databaseService.removeUser(id);
  }
}
