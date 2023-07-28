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
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';

@ApiTags('Artist')
@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  @Header('Content-Type', 'application/json')
  @ApiCreatedResponse({
    description: 'Created Succesfully',
    type: Artist,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.create(createArtistDto);
  }

  @Get()
  @Header('Content-Type', 'application/json')
  @ApiOkResponse({
    description: 'The resources were returned successfully',
    type: [Artist],
  })
  async findAll() {
    return this.artistService.findAll();
  }

  @Get(':id')
  @Header('Content-Type', 'application/json')
  @ApiOkResponse({
    description: 'The resource was returned successfully',
    type: Artist,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request, artistId is invalid(not uuid)',
  })
  @ApiNotFoundResponse({
    description: 'Track not found',
    status: HttpStatus.NOT_FOUND,
  })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.artistService.findOne(id);
  }

  @Put(':id')
  @Header('Content-Type', 'application/json')
  @ApiOkResponse({
    description: 'The resource was updated successfully',
    type: Artist,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request, artistId is invalid(not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Track not found' })
  async update(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    return this.artistService.update(id, updateArtistDto);
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
    return this.artistService.remove(id);
  }
}
