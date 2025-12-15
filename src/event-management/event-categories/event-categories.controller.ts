import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { EventCategoriesService } from './event-categories.service';
import {
  CreateEventCategoryDto,
  EditEventCategoryDto,
  EventCategorySearchParamsDto,
} from './dto';
import { PaginationParamsDto } from 'src/common/paginationParams.dto';
import { Prisma } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Event Categories')
@Controller('event-categories')
export class EventCategoriesController {
  constructor(private eventCategoriesService: EventCategoriesService) {}

  @Post()
  createEventCategory(@Body() dto: CreateEventCategoryDto) {
    return this.eventCategoriesService.createEventCategory(dto);
  }

  // @Get()
  // getEventCategories(
  //   @Query() { offset, limit }: PaginationParamsDto,
  //   @Query() { textSearch }: EventCategorySearchParamsDto,
  // ) {
  //   if (textSearch) {
  //     return this.eventCategoriesService.searchEventCategoryByText(
  //       textSearch,
  //       offset,
  //       limit,
  //     );
  //   }
  //   return this.eventCategoriesService.getEventCategories(offset, limit);
  // }

  @Get()
  getEventCategories(
    @Query() { where, orderBy },
    @Query() { page, perPage }: PaginationParamsDto,
  ) {
    return this.eventCategoriesService.getEventCategories({
      where,
      orderBy,
      page,
      perPage,
    });
  }
  @Get('/search')
  searchEventCategories(
    @Query() { textSearch: searchValue }: EventCategorySearchParamsDto,
    @Query() { page, perPage }: PaginationParamsDto,
  ) {
    const where: Prisma.EventCategoriesWhereInput = {
      categoryName: { contains: searchValue, mode: 'insensitive' },
    };
    return this.eventCategoriesService.searchEventCategoryByText({
      page,
      perPage,
      where,
    });
  }

  @Get(':id')
  getEventCategoryById(@Param('id') id: string) {
    return this.eventCategoriesService.getEventCategoryById(+id);
  }

  @Patch(':id')
  editEventCategoryById(
    @Param('id', ParseIntPipe) eventCategoryId: number,
    @Body() dto: EditEventCategoryDto,
  ) {
    return this.eventCategoriesService.editEventCategoryById(
      eventCategoryId,
      dto,
    );
  }

  @Delete(':id')
  deleteEventCategoryById(@Param('id', ParseIntPipe) eventCategoryId: number) {
    return this.eventCategoriesService.deleteEventCategoryById(eventCategoryId);
  }
}
