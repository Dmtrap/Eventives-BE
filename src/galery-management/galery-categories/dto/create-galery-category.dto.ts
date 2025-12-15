import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateGaleryCategoryDto {
    @IsNotEmpty()
    @IsString()
    categoryGalery: string
}
