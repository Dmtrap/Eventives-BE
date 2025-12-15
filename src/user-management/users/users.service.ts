import {
  BadRequestException,
    ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import * as bcrypt from 'bcryptjs';
import { ChangePasswordDto } from './dto/change-pass.dto';
import { Prisma, Users } from '@prisma/client';
import { paginator, PaginatorTypes } from '@nodeteam/nestjs-prisma-pagination';

const paginate: PaginatorTypes.PaginateFunction = paginator({ perPage: 10 });
export const roundsOfHashing = 10;

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(dto: CreateUserDto) {
    try {
      // Hash the password before saving the user
      const hashedPassword = await bcrypt.hash(dto.password, roundsOfHashing);
      dto.password = hashedPassword;

      const role = await this.prisma.roles.findUnique({
        where: { id: dto.roleId },
      });

      if (!role) {  
        throw new BadRequestException('Invalid Role ID');
      }

      const existingUser = await this.prisma.users.findUnique({
        where: { email: dto.email },
      });

      if (existingUser) {
        throw new ConflictException('Email already exists');
      }

      const user = await this.prisma.users.create({
        data: {
          ...dto,
          roleId: dto.roleId,
          userProfileId: {},
        },
        include: {
          role: true,
        },
      });

      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        const target = (error.meta as { target: string[] }).target;
        if (target.includes('email')) {
          throw new ConflictException('Email already exists');
        }
      }
      throw error;
    }
  }

  getUsers({
    where,
    orderBy,
    page = 1,
    perPage = 10,
  }: {
    where?: Prisma.UsersWhereInput;
    orderBy?: Prisma.UsersOrderByWithRelationInput;
    page?: number;
    perPage?: number;
  }): Promise<PaginatorTypes.PaginatedResult<Users>> {
    return paginate(
      this.prisma.users,
      {
        where,
        orderBy,
        include: {
          role: true, // Include the role relation
        },
      },
      {
        page,
        perPage,
      },
    );
  }

  async searchUsersByText({
    where,
    orderBy,
    page,
    perPage,
  }: {
    where?: Prisma.UsersWhereInput;
    orderBy?: Prisma.UsersOrderByWithRelationInput;
    page?: number;
    perPage?: number;
  }): Promise<PaginatorTypes.PaginatedResult<Users>> {
    return paginate(
      this.prisma.users,
      {
        where,
        orderBy,
        include: {
          role: true, // Include the role relation
        },
      },
      {
        page,
        perPage,
      },
    );
  }

  getUserById(userId: number) {
    return this.prisma.users.findFirst({
      where: {
        id: userId,
      },
    });
  }

  async editUserById(userId: number, dto: UpdateUserDto) {
    try {
      if (dto.password) {
        dto.password = await bcrypt.hash(dto.password, roundsOfHashing);
      }

      if (dto.roleId) {
        const role = await this.prisma.roles.findUnique({
          where: {
            id: dto.roleId,
          },
        });

        if (!role) {
          throw new BadRequestException('Invalid role ID');
        }
      }

      const user = await this.prisma.users.update({
        where: {
          id: userId,
        },
        data: {
          userName: dto.userName,
          email: dto.email,
          password: dto.password,
          status: dto.status,
          roleId: dto.roleId,
        },
        include: {
          role: true, // Include the role relation
        },
      });

      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new ForbiddenException('Resource not found');
        }
      }
      throw error;
    }
  }

  async deleteUserById(userId: number) {
    try {
      await this.prisma.userProfile.deleteMany({
        where: { userId },
      });

      const user = await this.prisma.users.delete({
        where: {
          id: userId,
        },
      });
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new ForbiddenException('Resource already deleted');
        }
      }
      throw error;
    }
  }

  async changePassword(
    id: number,
    changePassDto: ChangePasswordDto,
  ): Promise<void> {
    const { currentPassword, newPassword, confirmPassword } = changePassDto;
    const cekUser = await this.prisma.users.findUnique({ where: { id } });

    if (!cekUser) {
      throw new NotFoundException('Users Not Found');
    }

    if (newPassword !== confirmPassword) {
      throw new BadRequestException(
        'New Password and Confirm Password do matvh',
      );
    }

    const passwordMatches = await bcrypt.compare(
      currentPassword,
      cekUser.password,
    );

    if (!passwordMatches) {
      throw new BadRequestException('Current Password is Incorrect');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await this.prisma.users.update({
      where: { id },
      data: { password: hashedPassword },
    });
  }

  async findById(userId: number) {
    try {
      const user = await this.prisma.users.findUnique({
        where: {
          id: userId,
        },
        include: {
          userProfileId: true,
        },
      });

      if (!user) {
        throw new NotFoundException(`User with ID ${userId} not found`);
      }

      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('User not found');
        }
      }
      throw error;
    }
  }
}
