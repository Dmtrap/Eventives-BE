import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateVenueDto {
    @IsNotEmpty()
    @IsString()
    venueName: string
    @IsNotEmpty()
    @IsString()
    venueDesc: string
    @IsNotEmpty()
    @IsString()
    venueAddress: string
    @IsNotEmpty()
    @IsString()
    venueCity: string
    @IsNotEmpty()
    @IsString()
    venueGMapsLocation: string
    @IsNotEmpty()
    @IsString()
    latitude: string
    @IsNotEmpty()
    @IsString()
    longitude: string
    @IsNotEmpty()
    @IsInt()
    eventId: number
}
