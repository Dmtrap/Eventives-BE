import { PartialType } from '@nestjs/swagger';
import { CreateGaleryCategoryDto } from './create-galery-category.dto';

export class UpdateGaleryCategoryDto extends PartialType(CreateGaleryCategoryDto) {}
