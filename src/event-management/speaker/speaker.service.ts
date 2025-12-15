import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateSpeakerDto } from './dto/create-speaker.dto';
import { UpdateSpeakerDto } from './dto/update-speaker.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class SpeakerService {
  constructor(private prisma: PrismaService) {}

  async create(createSpeakerDto: CreateSpeakerDto) {
    try {
      const newSpeaker = await this.prisma.speaker.create({
        data: {
          ...createSpeakerDto,
        },
      });
      return newSpeaker;
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
    const getSpeaker = this.prisma.speaker.findMany();
    return getSpeaker;
  }

  findOne(id: number) {
    return this.prisma.speaker.findFirst({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, updateSpeakerDto: UpdateSpeakerDto) {
    const updateSpeaker = await this.prisma.speaker.update({
      where: {
        id: id,
      },
      data: {
        ...updateSpeakerDto,
      },
    });
    return updateSpeaker;
  }

  async remove(id: number) {
    try {
      const removeSpeaker = await this.prisma.speaker.delete({
        where: {
          id: id,
        },
      });
      return removeSpeaker;
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
