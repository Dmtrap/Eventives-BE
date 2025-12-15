import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { PaginationParamsDto } from 'src/common/paginationParams.dto';
import { EventSearchParamsDto } from './dto/search-events.dto';
import { Prisma } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Events')
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  createEvent(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.createEvent(createEventDto);
  }

  @Get()
  getEvents(
    @Query() { where, orderBy },
    @Query() { page, perPage }: PaginationParamsDto,
  ) {
    return this.eventsService.getEvents({
      where,
      orderBy,
      page,
      perPage,
    });
  }

  @Get('/search')
  searchEvents(
    @Query() { textSearch: searchValue }: EventSearchParamsDto,
    @Query() { page, perPage }: PaginationParamsDto,
  ) {
    const where: Prisma.EventsWhereInput = {
      eventName: { contains: searchValue, mode: 'insensitive' },
    };
    return this.eventsService.searchEventByText({
      page,
      perPage,
      where,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.getEventById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventsService.editEventById(+id, updateEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventsService.deleteEventById(+id);
  }
}
