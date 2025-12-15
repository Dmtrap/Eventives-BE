import { Module } from '@nestjs/common';
import { ParticipanlistService } from './participanlist.service';
import { ParticipanlistController } from './participanlist.controller';

@Module({
  controllers: [ParticipanlistController],
  providers: [ParticipanlistService],
})
export class ParticipanlistModule {}
