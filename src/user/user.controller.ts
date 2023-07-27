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
} from '@nestjs/swagger';
import { User } from './entities/user.entity';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Header('Content-Type', 'application/json')
  @Post()
  @ApiCreatedResponse({
    description: 'Created Succesfully',
    type: User,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  // @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Header('Content-Type', 'application/json')
  @Get()
  @ApiOkResponse({
    description: 'The resources were returned successfully',
    type: [User],
  })
  async findAll() {
    return this.userService.findAll();
  }

  @Header('Content-Type', 'application/json')
  @Get(':id')
  @ApiOkResponse({
    description: 'The resource was returned successfully',
    type: User,
  })
  // @ApiUnprocessableEntityResponse({
  //   description: 'Bad Request, userId is invalid(not uuid)',
  // })
  @ApiBadRequestResponse({
    description: 'Bad Request, userId is invalid(not uuid)',
  })
  @ApiNotFoundResponse({
    description: 'User not found',
    status: HttpStatus.NOT_FOUND,
  })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.findOne(id);
  }

  @Header('Content-Type', 'application/json')
  @Put(':id')
  @ApiOkResponse({
    description: 'The resource was updated successfully',
    type: User,
  })
  // @ApiResponse({
  //   description: 'Bad Request, userId is invalid(not uuid)',
  //   status: 400,
  // })
  @ApiForbiddenResponse({
    description: 'User oldPassword is wrong',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request, userId is invalid(not uuid)',
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  // @ApiBadRequestResponse({
  //   description: 'User oldPassword is wrong',
  // })
  async update(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Header('Content-Type', 'application/json')
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOkResponse({
    description: 'The resource was deleted successfully',
    status: HttpStatus.NO_CONTENT,
  })
  // @ApiResponse({
  //   description: 'Bad Request, userId is invalid(not uuid)',
  //   status: 400,
  // })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiBadRequestResponse({
    description: 'Bad Request, userId is invalid(not uuid)',
  })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.remove(id);
  }
}
