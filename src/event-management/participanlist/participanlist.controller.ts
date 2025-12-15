import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ParticipanlistService } from './participanlist.service';
import { CreateParticipanlistDto } from './dto/create-participanlist.dto';
import { UpdateParticipanlistDto } from './dto/update-participanlist.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Participant')
@Controller('participanlist')
export class ParticipanlistController {
  constructor(private readonly participanlistService: ParticipanlistService) {}

  @Post()
  create(@Body() createParticipanlistDto: CreateParticipanlistDto) {
    return this.participanlistService.create(createParticipanlistDto);
  }

  @Get()
  findAll() {
    return this.participanlistService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.participanlistService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateParticipanlistDto: UpdateParticipanlistDto) {
    return this.participanlistService.update(+id, updateParticipanlistDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.participanlistService.remove(+id);
  }
}
