import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class ScheduleService {
  constructor(private prisma: PrismaService) {}

  async create(createScheduleDto: CreateScheduleDto) {
    try {
      const newSchedule = await this.prisma.schedule.create({
        data: {
          ...createScheduleDto,
        },
      });

      return newSchedule;
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
    const getSchedule = this.prisma.schedule.findMany();
    return getSchedule;
  }

  findOne(id: number) {
    return this.prisma.schedule.findFirst({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, updateScheduleDto: UpdateScheduleDto) {
    const updateSchedule = await this.prisma.schedule.update({
      where: {
        id: id,
      },
      data: {
        ...updateScheduleDto,
      },
    });

    return updateSchedule;
  }

  async remove(id: number) {
    try {
      const removeSchedule = await this.prisma.schedule.delete({
        where: {
          id: id,
        },
      });
      return removeSchedule;
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
