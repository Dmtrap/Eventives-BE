import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class BannerService {
  constructor(
    private prisma: PrismaService
  ) {}

  async create(createBannerDto: CreateBannerDto) {
    try {
      const newBanner = await this.prisma.banner.create({
        data: {
          ...createBannerDto,
        },
      });
      return newBanner;
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
    const getBanner = this.prisma.banner.findMany();
    return getBanner;
  }

  findOne(id: number) {
    const getBannerId = this.prisma.banner.findFirst({
      where: {
        id: id,
      },
      include: {
        Galery: true
      },
    });
    return getBannerId;
  }

  async update(id: number, updateBannerDto: UpdateBannerDto) {
    const updateBanner = await this.prisma.banner.update({
      where: {
        id: id,
      },
      data: {
        ...updateBannerDto,
      }
    });
    return updateBanner;
  }

  async remove(id: number) {
    try {
      const removeBanner = await this.prisma.banner.delete({
        where: {
          id: id,
        },
      });
      return removeBanner;
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
