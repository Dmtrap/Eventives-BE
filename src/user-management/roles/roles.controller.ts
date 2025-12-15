import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto, UpdateRoleDto } from './dto';
import { ApiTags } from '@nestjs/swagger';
import { PaginationParamsDto } from 'src/common/paginationParams.dto';
import { Prisma } from '@prisma/client';
import { RolesSearchParamsDto } from './dto/search-roles.dto';


@Controller('roles')
@ApiTags('Roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  createRole(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.createRole(createRoleDto)
 }

  @Get()
  getRoles(
    @Query() { where, orderBy },
    @Query() { page, perPage }: PaginationParamsDto,
  ) {
    return this.rolesService.getRoles({
      where,
      orderBy,
      page,
      perPage,
    });
  }

  @Get('/search')
  searchRoles(
    @Query() { textSearch: searchValue }: RolesSearchParamsDto,
    @Query() { page, perPage }: PaginationParamsDto,
  ) {
    const where: Prisma.RolesWhereInput = {
      roleName: { contains: searchValue, mode: 'insensitive' },
    };
    return this.rolesService.searchRolesByText({
      page,
      perPage,
      where,
    });
  }

  @Get(':id')
  getRoleById(@Param('id', ParseIntPipe) id: string) {
    return this.rolesService.getRoleById(+id);
  }

  @Patch(':id')
  editRoleById(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateRoleDto: UpdateRoleDto,
  ) {
    return this.rolesService.editRoleById(+id, updateRoleDto);
  }

  @Delete(':id')
  deleteRoleById(@Param('id', ParseIntPipe) id: string) {
    return this.rolesService.deleteRoleById(+id);
  }
 
}