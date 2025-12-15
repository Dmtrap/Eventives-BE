import { PartialType } from '@nestjs/swagger';
import { CreateParticipanlistDto } from './create-participanlist.dto';

export class UpdateParticipanlistDto extends PartialType(CreateParticipanlistDto) {}
