import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateParticipanlistDto } from './dto/create-participanlist.dto';
import { UpdateParticipanlistDto } from './dto/update-participanlist.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class ParticipanlistService {
  constructor(
    private prisma: PrismaService
  ) {}

  async create(createParticipanlistDto: CreateParticipanlistDto) {
    try {
      const newParticipant = await this.prisma.participantLists.create({
        data: {
          ...createParticipanlistDto,
        },
      });
      return newParticipant;
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
    const getParticipant = this.prisma.participantLists.findMany();
    return getParticipant;
  }

  findOne(id: number) {
    const getParticipantId = this.prisma.participantLists.findFirst({
      where: {
        id: id,
      },
    });
    return getParticipantId;
  }

  async update(id: number, updateParticipanlistDto: UpdateParticipanlistDto) {
    const updateParticipant = await this.prisma.participantLists.update({
      where: {
        id: id,
      },
      data: {
        ...updateParticipanlistDto,
      }
    });
    return updateParticipant;
  }

  async remove(id: number) {
    try {
      const removeParticipant = await this.prisma.participantLists.delete({
        where: {
          id: id,
        },
      });
      return removeParticipant;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new ForbiddenException('Resource already delete');
        }
      }
      throw error;
    }
  }
}
