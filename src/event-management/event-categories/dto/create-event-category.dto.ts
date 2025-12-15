import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateEventCategoryDto {
  @IsString()
  @IsNotEmpty()
  categoryName: string;

  @IsBoolean()
  @IsNotEmpty()
  status: boolean;
}
