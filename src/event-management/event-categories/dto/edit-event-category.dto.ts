import { PartialType } from '@nestjs/mapped-types';
import { CreateEventCategoryDto } from './create-event-category.dto';

export class EditEventCategoryDto extends PartialType(CreateEventCategoryDto) {}
