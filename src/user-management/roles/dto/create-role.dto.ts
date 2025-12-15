import { IsBoolean, IsEnum, IsNotEmpty, IsString } from 'class-validator';
// import { Role } from '../enums/role.enum';

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  roleName: string;

  @IsString()
  @IsNotEmpty()
  description: string;
  
  @IsBoolean()
  @IsNotEmpty()
  status: boolean;
  
}
