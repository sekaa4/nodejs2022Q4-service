import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Header,
  HttpStatus,
  HttpCode,
  ParseUUIDPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiBadRequestResponse,
  ApiNoContentResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { User } from './entities/user.entity';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ description: 'Create a new user', summary: 'Create user' })
  @ApiCreatedResponse({
    description: 'The user has been created.',
    type: User,
  })
  @ApiBadRequestResponse({
    description: 'Bad request, body does not contain required fields',
  })
  @Header('Content-Type', 'application/json')
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    return new User(user);
  }

  @Header('Content-Type', 'application/json')
  @ApiOperation({ summary: 'Get all users', description: 'Get all users' })
  @ApiOkResponse({
    description: 'The resources were returned successfully',
    type: [User],
  })
  @Get()
  async findAll() {
    const users = await this.userService.findAll();
    return users;
  }

  @Header('Content-Type', 'application/json')
  @ApiOperation({
    summary: 'Get single user by id',
    description: 'Get single user by id',
  })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiOkResponse({
    description: 'The resource was returned successfully',
    type: User,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request, user "id" is invalid (not uuid)',
  })
  @ApiNotFoundResponse({
    description: 'User not found',
  })
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const user = await this.userService.findOne(id);
    return new User(user);
  }

  @Header('Content-Type', 'application/json')
  @ApiOperation({
    summary: "Update a user's password",
    description: "Updates a user's password by ID",
  })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiOkResponse({
    description: 'The user has been updated.',
    type: User,
  })
  @ApiForbiddenResponse({
    description: 'User oldPassword is wrong',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request, user "id" is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  @Put(':id')
  async update(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const user = await this.userService.update(id, updateUserDto);
    return new User(user);
  }

  @Header('Content-Type', 'application/json')
  @ApiOperation({
    summary: 'Delete user',
    description: 'Deletes user by ID.',
  })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({
    description: 'Deleted user successfully',
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiBadRequestResponse({
    description: 'Bad Request, user "id" is invalid (not uuid)',
  })
  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.remove(id);
  }
}
