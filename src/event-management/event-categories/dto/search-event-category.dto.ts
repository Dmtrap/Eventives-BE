import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class EventCategorySearchParamsDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  textSearch?: string | null;
}
