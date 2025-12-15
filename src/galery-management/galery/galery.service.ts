import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateGaleryDto } from './dto/create-galery.dto';
import { UpdateGaleryDto } from './dto/update-galery.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class GaleryService {
  constructor(
    private prisma: PrismaService
  ) {}

  async create(createGaleryDto: CreateGaleryDto) {
    try {
      const newGalery = await this.prisma.galery.create({
        data: {
          ...createGaleryDto,
        },
      });
      return newGalery;
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
    const getGalery = this.prisma.galery.findMany();
    return getGalery;
  }

  findOne(id: number) {
    const getGaleryId = this.prisma.galery.findFirst({
      where: {
        id: id,
      },
    });
    return getGaleryId;
  }

  async update(id: number, updateGaleryDto: UpdateGaleryDto) {
    const updateGalery = await this.prisma.galery.update({
      where: {
        id: id,
      },
      data: {
        ...updateGaleryDto,
      }
    });
    return updateGalery;
  }

  async remove(id: number) {
    try {
      const removeGalery = await this.prisma.galery.delete({
        where: {
          id: id,
        },
      });
      return removeGalery;
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
