import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EventTicketService } from './event-ticket.service';
import { CreateEventTicketDto } from './dto/create-event-ticket.dto';
import { UpdateEventTicketDto } from './dto/update-event-ticket.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Event-Ticket')
@Controller('event-ticket')
export class EventTicketController {
  constructor(private readonly eventTicketService: EventTicketService) {}

  @Post()
  create(@Body() createEventTicketDto: CreateEventTicketDto) {
    return this.eventTicketService.create(createEventTicketDto);
  }

  @Get()
  findAll() {
    return this.eventTicketService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventTicketService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventTicketDto: UpdateEventTicketDto) {
    return this.eventTicketService.update(+id, updateEventTicketDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventTicketService.remove(+id);
  }
}
