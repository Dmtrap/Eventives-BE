import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateSpeakerDto {
    @IsNotEmpty()
    @IsString()
    name: string;
    @IsNotEmpty()
    @IsString()
    profession: string;
    @IsOptional()
    @IsString()
    instagram: string | null;
    @IsOptional()
    @IsString()
    x: string | null;
    @IsOptional()
    @IsString()
    facebook: string | null;
    @IsOptional()
    @IsString()
    linkedin: string | null;
    @IsNotEmpty()
    @IsString()
    photo: string;
    @IsNotEmpty()
    @IsInt()
    eventId: number;
}
