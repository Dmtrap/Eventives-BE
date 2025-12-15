import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateSponsorDto {
    @IsNotEmpty()
    @IsString()
    sponsorName: string
    @IsNotEmpty()
    @IsString()
    sponsorWebLink: string
    @IsNotEmpty()
    @IsString()
    sponsorLogo: string
    @IsNotEmpty()
    @IsInt()
    eventId: number
}
