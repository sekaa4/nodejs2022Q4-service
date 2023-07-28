import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { DatabaseService } from 'src/database/database.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createUserDto: CreateUserDto): Promise<Omit<User, 'password'>> {
    const userPayload = {
      id: uuid(),
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      ...createUserDto,
    };

    const user = await this.databaseService.users.create(userPayload);
    delete user.password;

    return user;
  }

  async findAll() {
    const users = await this.databaseService.users.findMany();
    const resUsers = users.map((user) => {
      delete user.password;
      return user;
    });

    return resUsers;
  }

  async findOne(id: string) {
    const user = await this.databaseService.users.findUnique(id);

    if (!user) throw new NotFoundException(`User with id: <${id}> not found`);

    delete user.password;
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.databaseService.users.update(id, updateUserDto);

    delete user.password;
    return user;
  }

  async remove(id: string) {
    return this.databaseService.users.delete(id);
  }
}
