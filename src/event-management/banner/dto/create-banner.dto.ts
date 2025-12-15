import { ApiProperty } from "@nestjs/swagger"
import { IsInt, IsString, IsNotEmpty } from "class-validator";

export class CreateBannerDto {
    @IsNotEmpty()
    @IsString()
    titleBanner: string
    @IsNotEmpty()
    @IsInt()
    seatMax: number
    @IsNotEmpty()
    @IsInt()
    speakerCount: number
    @IsNotEmpty()
    @IsString()
    city: string
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        description: "Start date of the activity in yy/mm/dd format",
        type: String,
        example: "0000-00-00T00:00:00Z", 
    })
    eventTime: string
    @IsNotEmpty()
    @IsInt()
    eventId: number
}
