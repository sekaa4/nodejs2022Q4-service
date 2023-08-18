import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.databaseService.user.create({
      data: createUserDto,
    });

    return user;
  }

  async findAll() {
    const users = await this.databaseService.user.findMany();

    return users;
  }

  async findOne(id: string) {
    const user = await this.databaseService.user.findUnique({
      where: { id: id },
    });

    if (!user) throw new NotFoundException(`User was not found`);

    return user;
  }

  async findOneWithLogin(login: string) {
    const user = await this.databaseService.user.findUnique({
      where: { login },
    });

    if (!user)
      throw new ForbiddenException(
        `Authentication failed, no user with such login`,
      );

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const { newPassword, oldPassword } = updateUserDto;

    const user = await this.databaseService.user.findUnique({
      where: { id: id },
    });

    if (!user) throw new NotFoundException(`User was not found`);

    if (user.password === oldPassword) {
      await this.databaseService.user.update({
        where: { id: id },
        data: {
          version: { increment: 1 },
          password: newPassword,
        },
      });

      return await this.databaseService.user.findUnique({
        where: { id: id },
      });
    }

    throw new ForbiddenException(`User oldPassword is wrong`);
  }

  async remove(id: string) {
    try {
      await this.databaseService.user.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`User was not found`);
      } else throw error;
    }
  }
}
