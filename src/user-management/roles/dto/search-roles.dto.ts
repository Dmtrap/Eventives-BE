import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class RolesSearchParamsDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  textSearch?: string | null;
}
