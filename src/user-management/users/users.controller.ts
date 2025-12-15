import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  Query,
  Req,
  Request,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-pass.dto';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PaginationParamsDto } from 'src/common/paginationParams.dto';
import { UsersSearchParamsDto } from './dto/search-users.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private prisma: PrismaService,
  ) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@Request() req) {
    const userId = req.user?.user?.id;

    if (!userId) {
      throw new UnauthorizedException('User ID is missing');
    }

    const user = await this.prisma.users.findUnique({
      where: {
        id: userId,
      },
      include: {
        userProfileId: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const userProfile = user.userProfileId?.[0];

    return {
      id: user.id,
      email: user.email,
      userName: user.userName,
      role: user.roleId,
      firstName: userProfile?.firstName,
      lastName: userProfile?.lastName,
      phoneNumber: userProfile?.phoneNumber,
      address: userProfile?.address,
      avatar: userProfile?.avatar,
      title: userProfile?.title,
      affiliateLink: userProfile?.affiliateLink,
    };
  }

  @Post()
  createUser(@Body() dto: CreateUserDto) {
    return this.usersService.createUser(dto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  getUser(
    @Query() { where, orderBy },
    @Query() { page, perPage }: PaginationParamsDto,
  ) {
    return this.usersService.getUsers({
      where,
      orderBy,
      page,
      perPage,
    });
  }
  
  @Get('/search')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  searchUsers(
    @Query() { textSearch: searchValue }: UsersSearchParamsDto,
    @Query() { page, perPage }: PaginationParamsDto,
  ) {
    const where: Prisma.UsersWhereInput = {
      userName: { contains: searchValue, mode: 'insensitive' },
    };
    return this.usersService.searchUsersByText({
      page,
      perPage,
      where,
    });
  }

  
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  getUserById(@Param('id') id: string) {
    return this.usersService.getUserById(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  editUserById(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.usersService.editUserById(+id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  deleteUserById(@Param('id') id: string) {
    return this.usersService.deleteUserById(+id);
  }

  @Patch(':id/password')
  async changePassword(
    @Param('id', ParseIntPipe) id: number,
    @Body() changePasswordDto: ChangePasswordDto,
  ): Promise<{ message: string }> {
    console.log('received change password request:', changePasswordDto);
    await this.usersService.changePassword(id, changePasswordDto);
    return { message: 'Password changed succesfully' };
  }
}
