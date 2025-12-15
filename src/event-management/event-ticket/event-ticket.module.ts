import { Module } from '@nestjs/common';
import { EventTicketService } from './event-ticket.service';
import { EventTicketController } from './event-ticket.controller';

@Module({
  controllers: [EventTicketController],
  providers: [EventTicketService],
})
export class EventTicketModule {}
