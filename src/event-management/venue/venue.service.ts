import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateVenueDto } from './dto/create-venue.dto';
import { UpdateVenueDto } from './dto/update-venue.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class VenueService {
  constructor(
    private prisma: PrismaService
  ) {}

  async create(createVenueDto: CreateVenueDto) {
    try {
      const newVenue = await this.prisma.venue.create({
        data: {
          ...createVenueDto,
        },
      });

      return newVenue;
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
    const getVenue = this.prisma.venue.findMany();
    return getVenue;
  }

  findOne(id: number) {
    const getVenueId = this.prisma.venue.findFirst({
      where: {
        id: id,
      },
    });
    return getVenueId;
  }

  async update(id: number, updateVenueDto: UpdateVenueDto) {
    const updateVenue = await this.prisma.venue.update({
      where: {
        id: id,
      },
      data: {
        ...updateVenueDto,
      }
    });
    return updateVenue;
  }

  async remove(id: number) {
    try {
      const removeVenue = await this.prisma.venue.delete({
        where: {
          id: id,
        },
      });
      return removeVenue;
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
