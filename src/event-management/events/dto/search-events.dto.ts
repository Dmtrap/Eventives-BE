import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class EventSearchParamsDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  textSearch?: string | null;
}
