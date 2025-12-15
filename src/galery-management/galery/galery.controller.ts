import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GaleryService } from './galery.service';
import { CreateGaleryDto } from './dto/create-galery.dto';
import { UpdateGaleryDto } from './dto/update-galery.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Galery')
@Controller('galery')
export class GaleryController {
  constructor(private readonly galeryService: GaleryService) {}

  @Post()
  create(@Body() createGaleryDto: CreateGaleryDto) {
    return this.galeryService.create(createGaleryDto);
  }

  @Get()
  findAll() {
    return this.galeryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.galeryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGaleryDto: UpdateGaleryDto) {
    return this.galeryService.update(+id, updateGaleryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.galeryService.remove(+id);
  }
}
