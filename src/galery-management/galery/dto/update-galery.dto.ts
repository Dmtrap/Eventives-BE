import { PartialType } from '@nestjs/swagger';
import { CreateGaleryDto } from './create-galery.dto';

export class UpdateGaleryDto extends PartialType(CreateGaleryDto) {}
