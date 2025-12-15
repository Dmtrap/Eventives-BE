import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TicketTransactionService } from './ticket-transaction.service';
import { CreateTicketTransactionDto } from './dto/create-ticket-transaction.dto';
import { UpdateTicketTransactionDto } from './dto/update-ticket-transaction.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Ticket Transaction')
@Controller('ticket-transaction')
export class TicketTransactionController {
  constructor(private readonly ticketTransactionService: TicketTransactionService) {}

  @Post()
  create(@Body() createTicketTransactionDto: CreateTicketTransactionDto) {
    return this.ticketTransactionService.create(createTicketTransactionDto);
  }

  @Get()
  findAll() {
    return this.ticketTransactionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketTransactionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTicketTransactionDto: UpdateTicketTransactionDto) {
    return this.ticketTransactionService.update(+id, updateTicketTransactionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ticketTransactionService.remove(+id);
  }
}
