import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateTicketTransactionDto } from './dto/create-ticket-transaction.dto';
import { UpdateTicketTransactionDto } from './dto/update-ticket-transaction.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class TicketTransactionService {
  constructor(
    private prisma: PrismaService
  ) {}

  async create(createTicketTransactionDto: CreateTicketTransactionDto) {
    try {
      const newTransaction = await this.prisma.ticketTransaction.create({
        data: {
          ...createTicketTransactionDto,
        },
      });
      return newTransaction;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error;
    }
  }

  findAll() {
    const getTransaction = this.prisma.ticketTransaction.findMany();
    return getTransaction;
  }

  findOne(id: number) {
    const getTransactionId = this.prisma.ticketTransaction.findFirst({
      where: {
        id: id,
      },
    });
    return getTransactionId;
  }

  async update(id: number, updateTicketTransactionDto: UpdateTicketTransactionDto) {
    const updateTransaction = await this.prisma.ticketTransaction.update({
      where: {
        id: id,
      },
      data: {
        ...updateTicketTransactionDto,
      }
    });
    return updateTransaction;
  }

  async remove(id: number) {
    try {
      const removeTransaction = await this.prisma.ticketTransaction.delete({
        where: {
          id: id,
        },
      });
      return removeTransaction;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new ForbiddenException('Resource already deleted');
        }
      }
      throw error;
    }
  }
}
