import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Header,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
  Put,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiNoContentResponse,
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBearerAuth,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';

@ApiTags('Album')
@ApiBearerAuth()
@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Header('Content-Type', 'application/json')
  @ApiOperation({
    summary: 'Add new album',
    description: 'Add new album information',
  })
  @ApiCreatedResponse({
    description: 'Album is created',
    type: Album,
  })
  @ApiBadRequestResponse({
    description: 'Bad request, body does not contain required fields',
  })
  @Post()
  async create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.create(createAlbumDto);
  }

  @Header('Content-Type', 'application/json')
  @ApiOperation({
    summary: 'Get albums list',
    description: 'Gets all library alibums list',
  })
  @ApiOkResponse({
    description: 'The resources were returned successfully',
    type: [Album],
  })
  @ApiUnauthorizedResponse({
    description: 'Access token is missing or invalid',
  })
  @Get()
  async findAll() {
    return this.albumService.findAll();
  }

  @Header('Content-Type', 'application/json')
  @ApiOperation({
    summary: 'Get single album by id',
    description: 'Gets single album by id',
  })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiOkResponse({
    description: 'The album was returned successfully',
    type: Album,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request, album "id" is invalid (not uuid)',
  })
  @ApiUnauthorizedResponse({
    description: 'Access token is missing or invalid',
  })
  @ApiNotFoundResponse({
    description: 'Album was not found',
    status: HttpStatus.NOT_FOUND,
  })
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.albumService.findOne(id);
  }

  @Header('Content-Type', 'application/json')
  @ApiOperation({
    summary: 'Update album information',
    description: 'Update library album information by UUID',
  })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiOkResponse({
    description: 'The album has been updated',
    type: Album,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request, album "id" is invalid (not uuid)',
  })
  @ApiUnauthorizedResponse({
    description: 'Access token is missing or invalid',
  })
  @ApiNotFoundResponse({ description: 'Album was not found' })
  @Put(':id')
  async update(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    return this.albumService.update(id, updateAlbumDto);
  }

  @Header('Content-Type', 'application/json')
  @ApiOperation({
    summary: 'Delete album',
    description: 'Delete album from library',
  })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({
    description: 'Deleted album successfully',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request, album "id" is invalid (not uuid)',
  })
  @ApiUnauthorizedResponse({
    description: 'Access token is missing or invalid',
  })
  @ApiNotFoundResponse({ description: 'Album was not found' })
  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.albumService.remove(id);
  }
}
