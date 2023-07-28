import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Header,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { FavsService } from './favs.service';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiProperty,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { FavoritesEntity } from './entities/fav.entity';

class ResponseObj {
  @ApiProperty({
    type: String,
  })
  message: string;
}

@ApiTags('Favs')
@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Post('/track/:id')
  @Header('Content-Type', 'application/json')
  @ApiCreatedResponse({
    description: 'Created Succesfully',
    type: ResponseObj,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiUnprocessableEntityResponse({
    description: 'Unprocessable Entity, entity does not exist',
  })
  async createTrack(@Param('id', ParseUUIDPipe) id: string) {
    const message = await this.favsService.create(id, 'tracks');
    const response = { message };
    return response;
  }

  @Post('/album/:id')
  @Header('Content-Type', 'application/json')
  @ApiCreatedResponse({
    description: 'Created Succesfully',
    type: ResponseObj,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiUnprocessableEntityResponse({
    description: 'Unprocessable Entity, entity does not exist',
  })
  async createAlbum(@Param('id', ParseUUIDPipe) id: string) {
    const message = await this.favsService.create(id, 'albums');
    const response = { message };

    return response;
  }

  @Post('/artist/:id')
  @Header('Content-Type', 'application/json')
  @ApiCreatedResponse({
    description: 'Created Succesfully',
    type: ResponseObj,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiUnprocessableEntityResponse({
    description: 'Unprocessable Entity, entity does not exist',
  })
  async createArtist(@Param('id', ParseUUIDPipe) id: string) {
    const message = await this.favsService.create(id, 'artists');
    const response = { message };

    return response;
  }

  @Get()
  @Header('Content-Type', 'application/json')
  @ApiOkResponse({
    description: 'The resources were returned successfully',
    type: FavoritesEntity,
  })
  async findAll() {
    return this.favsService.findAll();
  }

  @Delete('track/:id')
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({
    description: 'The resource was deleted successfully',
  })
  @ApiNotFoundResponse({ description: 'Track not found' })
  @ApiBadRequestResponse({
    description: 'Bad Request, trackId is invalid(not uuid)',
  })
  async removeTrack(@Param('id') id: string) {
    return this.favsService.remove(id, 'tracks');
  }

  @Delete('album/:id')
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({
    description: 'The resource was deleted successfully',
  })
  @ApiNotFoundResponse({ description: 'Track not found' })
  @ApiBadRequestResponse({
    description: 'Bad Request, trackId is invalid(not uuid)',
  })
  async removeAlbum(@Param('id') id: string) {
    return this.favsService.remove(id, 'albums');
  }

  @Delete('artist/:id')
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({
    description: 'The resource was deleted successfully',
  })
  @ApiNotFoundResponse({ description: 'Track not found' })
  @ApiBadRequestResponse({
    description: 'Bad Request, trackId is invalid(not uuid)',
  })
  async removeArtist(@Param('id') id: string) {
    return this.favsService.remove(id, 'artists');
  }
}
