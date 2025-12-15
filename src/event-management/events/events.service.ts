import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { paginator, PaginatorTypes } from '@nodeteam/nestjs-prisma-pagination';
import { Events, Prisma } from '@prisma/client';

const paginate: PaginatorTypes.PaginateFunction = paginator({ perPage: 5 });

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  async createEvent(createEventDto: CreateEventDto) {
    try {
      const roles = await this.prisma.events.create({
        data: {
          ...createEventDto,
        },
      });

      return roles;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error;
    }
  }

  getEvents({
    where,
    orderBy,
    page,
    perPage,
  }: {
    where?: Prisma.EventCategoriesWhereInput;
    orderBy?: Prisma.EventCategoriesOrderByWithRelationInput;
    page?: number;
    perPage?: number;
  }): Promise<PaginatorTypes.PaginatedResult<Events>> {
    return paginate(
      this.prisma.events,
      {
        where,
        include: {
          Venue: true
        },
        orderBy,
      },
      {
        page,
        perPage,
      },
    );
  }

  getEventById(eventId: number) {
    return this.prisma.events.findFirst({
      where: {
        id: eventId,
      },
      include: {
        eventCategory: true,
        user: true,
        Schedule: true,
        ParticipantLists: true,
        EventTicket: true,
        Venue: true,
        Sponsors: true,
        Banner: true
      },
    });
  }

  async searchEventByText({
    where,
    orderBy,
    page,
    perPage,
  }: {
    where?: Prisma.EventsWhereInput;
    orderBy?: Prisma.EventsOrderByWithRelationInput;
    page?: number;
    perPage?: number;
  }): Promise<PaginatorTypes.PaginatedResult<Events>> {
    return paginate(
      this.prisma.events,
      {
        where,
        orderBy,
      },
      {
        page,
        perPage,
      },
    );
  }

  async editEventById(eventId: number, updateEventDto: UpdateEventDto) {
    const eventCategory = await this.prisma.events.update({
      where: {
        id: eventId,
      },
      data: {
        ...updateEventDto,
      },
    });

    return eventCategory;
  }

  async deleteEventById(eventId: number) {
    try {
      const eventCategory = await this.prisma.events.delete({
        where: {
          id: eventId,
        },
      });
      return eventCategory;
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
