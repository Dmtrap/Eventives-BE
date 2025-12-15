import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateGaleryDto {
    @IsNotEmpty()
    @IsString()
    namePicture: string
    @IsNotEmpty()
    @IsInt()
    galeryCategoryId: number
    @IsNotEmpty()
    @IsInt()
    bannerId: number
}
