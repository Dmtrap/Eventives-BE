import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GaleryCategoriesService } from './galery-categories.service';
import { CreateGaleryCategoryDto } from './dto/create-galery-category.dto';
import { UpdateGaleryCategoryDto } from './dto/update-galery-category.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Galery Category')
@Controller('galery-categories')
export class GaleryCategoriesController {
  constructor(private readonly galeryCategoriesService: GaleryCategoriesService) {}

  @Post()
  create(@Body() createGaleryCategoryDto: CreateGaleryCategoryDto) {
    return this.galeryCategoriesService.create(createGaleryCategoryDto);
  }

  @Get()
  findAll() {
    return this.galeryCategoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.galeryCategoriesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGaleryCategoryDto: UpdateGaleryCategoryDto) {
    return this.galeryCategoriesService.update(+id, updateGaleryCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.galeryCategoriesService.remove(+id);
  }
}
