import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateGaleryCategoryDto } from './dto/create-galery-category.dto';
import { UpdateGaleryCategoryDto } from './dto/update-galery-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class GaleryCategoriesService {
  constructor(
    private prisma:PrismaService
  ) {}

  async create(createGaleryCategoryDto: CreateGaleryCategoryDto) {
    try {
      const newGaleryCategory = await this.prisma.galeryCategory.create({
        data: {
          ...createGaleryCategoryDto,
        },
      });
      return newGaleryCategory;
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
    const getGaleryCategory = this.prisma.galeryCategory.findMany();
    return getGaleryCategory;
  }

  findOne(id: number) {
    const getGaleryCategoryId = this.prisma.galeryCategory.findFirst({
      where: {
        id: id,
      },
    });
    return getGaleryCategoryId;
  }

  async update(id: number, updateGaleryCategoryDto: UpdateGaleryCategoryDto) {
    const updateGaleryCategory = await this.prisma.galeryCategory.update({
      where: {
        id: id,
      },
      data: {
        ...updateGaleryCategoryDto,
      }
    });
    return updateGaleryCategory
  }

  async remove(id: number) {
    try {
      const removeGaleryCategory = await this.prisma.galeryCategory.delete({
        where: {
          id: id,
        },
      });
      return removeGaleryCategory;
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
