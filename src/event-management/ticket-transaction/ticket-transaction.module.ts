import { Module } from '@nestjs/common';
import { TicketTransactionService } from './ticket-transaction.service';
import { TicketTransactionController } from './ticket-transaction.controller';

@Module({
  controllers: [TicketTransactionController],
  providers: [TicketTransactionService],
})
export class TicketTransactionModule {}
