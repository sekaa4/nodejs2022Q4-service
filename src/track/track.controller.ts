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
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import {
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiNoContentResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Track } from './entities/track.entity';

@ApiTags('Track')
@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  @Header('Content-Type', 'application/json')
  @ApiCreatedResponse({
    description: 'Created Succesfully',
    type: Track,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async create(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.create(createTrackDto);
  }

  @Get()
  @Header('Content-Type', 'application/json')
  @ApiOkResponse({
    description: 'The resources were returned successfully',
    type: [Track],
  })
  async findAll() {
    return this.trackService.findAll();
  }

  @Get(':id')
  @Header('Content-Type', 'application/json')
  @ApiOkResponse({
    description: 'The resource was returned successfully',
    type: Track,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request, trackId is invalid(not uuid)',
  })
  @ApiNotFoundResponse({
    description: 'Track not found',
    status: HttpStatus.NOT_FOUND,
  })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.trackService.findOne(id);
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
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    return this.trackService.update(id, updateTrackDto);
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
    return this.trackService.remove(id);
  }
}
