import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UsersSearchParamsDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  textSearch?: string | null;
}
