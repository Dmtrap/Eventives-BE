import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateSponsorDto } from './dto/create-sponsor.dto';
import { UpdateSponsorDto } from './dto/update-sponsor.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class SponsorService {
  constructor(
    private prisma: PrismaService
  ) {}

  async create(createSponsorDto: CreateSponsorDto) {
    try {
      const newSponsor = await this.prisma.sponsors.create({
        data: {
          ...createSponsorDto,
        },
      });
      return newSponsor;
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
    const getSponsor = this.prisma.sponsors.findMany();
    return getSponsor;
  }

  findOne(id: number) {
    const getSponsorId = this.prisma.sponsors.findFirst({
      where: {
        id: id,
      },
    });
    return getSponsorId;
  }

  async update(id: number, updateSponsorDto: UpdateSponsorDto) {
    const updateSponsor = await this.prisma.sponsors.update({
      where: {
        id: id,
      },
      data: {
        ...updateSponsorDto,
      }
    });
    return updateSponsor;
  }

  async remove(id: number) {
    try {
      const removeSponsor = await this.prisma.sponsors.delete({
        where: {
          id: id,
        },
      });
      return removeSponsor;
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
