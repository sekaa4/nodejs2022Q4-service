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
} from '@nestjs/swagger';
import { Track } from 'src/track/entities/track.entity';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';

@ApiTags('Album')
@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  @Header('Content-Type', 'application/json')
  @ApiCreatedResponse({
    description: 'Created Succesfully',
    type: Album,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.create(createAlbumDto);
  }

  @Get()
  @Header('Content-Type', 'application/json')
  @ApiOkResponse({
    description: 'The resources were returned successfully',
    type: [Album],
  })
  async findAll() {
    return this.albumService.findAll();
  }

  @Get(':id')
  @Header('Content-Type', 'application/json')
  @ApiOkResponse({
    description: 'The resource was returned successfully',
    type: Album,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request, trackId is invalid(not uuid)',
  })
  @ApiNotFoundResponse({
    description: 'Track not found',
    status: HttpStatus.NOT_FOUND,
  })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.albumService.findOne(id);
  }

  @Put(':id')
  @Header('Content-Type', 'application/json')
  @ApiOkResponse({
    description: 'The resource was updated successfully',
    type: Track,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request, trackId is invalid(not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Track not found' })
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

  @Delete(':id')
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({
    description: 'The resource was deleted successfully',
  })
  @ApiNotFoundResponse({ description: 'Track not found' })
  @ApiBadRequestResponse({
    description: 'Bad Request, trackId is invalid(not uuid)',
  })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.albumService.remove(id);
  }
}
