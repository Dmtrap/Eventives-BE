import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateEventCategoryDto, EditEventCategoryDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { EventCategories, Prisma } from '@prisma/client';
import { paginator, PaginatorTypes } from '@nodeteam/nestjs-prisma-pagination';

const paginate: PaginatorTypes.PaginateFunction = paginator({ perPage: 10 });

@Injectable()
export class EventCategoriesService {
  constructor(private prisma: PrismaService) {}

  async createEventCategory(dto: CreateEventCategoryDto) {
    try {
      const eventCategories = await this.prisma.eventCategories.create({
        data: {
          ...dto,
        },
      });

      return eventCategories;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error;
    }
  }

  async getEventCategories({
    where,
    orderBy,
    page,
    perPage,
  }: {
    where?: Prisma.EventCategoriesWhereInput;
    orderBy?: Prisma.EventCategoriesOrderByWithRelationInput;
    page?: number;
    perPage?: number;
  }): Promise<PaginatorTypes.PaginatedResult<EventCategories>> {
    return paginate(
      this.prisma.eventCategories,
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
  getEventCategoryById(eventCategoryId: number) {
    return this.prisma.eventCategories.findFirst({
      where: {
        id: eventCategoryId,
      },
    });
  }

  async searchEventCategoryByText({
    where,
    orderBy,
    page,
    perPage,
  }: {
    where?: Prisma.EventCategoriesWhereInput;
    orderBy?: Prisma.EventCategoriesOrderByWithRelationInput;
    page?: number;
    perPage?: number;
  }): Promise<PaginatorTypes.PaginatedResult<EventCategories>> {
    return paginate(
      this.prisma.eventCategories,
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

  async editEventCategoryById(
    eventCategoryId: number,
    dto: EditEventCategoryDto,
  ) {
    const eventCategory = await this.prisma.eventCategories.update({
      where: {
        id: eventCategoryId,
      },
      data: {
        ...dto,
      },
    });

    return eventCategory;
  }

  async deleteEventCategoryById(eventCategoryId: number) {
    try {
      const eventCategory = await this.prisma.eventCategories.delete({
        where: {
          id: eventCategoryId,
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
