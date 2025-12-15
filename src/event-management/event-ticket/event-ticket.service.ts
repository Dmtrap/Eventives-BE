import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateEventTicketDto } from './dto/create-event-ticket.dto';
import { UpdateEventTicketDto } from './dto/update-event-ticket.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class EventTicketService {
  constructor(
    private prisma: PrismaService
  ) {}

  async create(createEventTicketDto: CreateEventTicketDto) {
    try {
      const newEventTicket = await this.prisma.eventTicket.create({
        data: {
          ...createEventTicketDto,
        },
      });
      return newEventTicket;
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
    const getEventTicket = this.prisma.eventTicket.findMany();
    return getEventTicket;
  }

  findOne(id: number) {
    const getEventTicketId = this.prisma.eventTicket.findFirst({
      where: {
        id: id,
      },
    });
    return getEventTicketId;
  }

  async update(id: number, updateEventTicketDto: UpdateEventTicketDto) {
    const updateEventTicket = await this.prisma.eventTicket.update({
      where: {
        id: id,
      },
      data: {
        ...updateEventTicketDto,
      }
    });
    return updateEventTicket;
  }

  async remove(id: number) {
    try {
      const removeEventTicket = await this.prisma.eventTicket.delete({
        where: {
          id: id,
        },
      });
      return removeEventTicket;
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
