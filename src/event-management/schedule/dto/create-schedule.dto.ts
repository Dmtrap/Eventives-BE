import { ApiProperty } from "@nestjs/swagger"
import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class CreateScheduleDto {
    @ApiProperty({
        description: "Start date of the activity in yy/mm/dd format",
        type: String,
        example: "0000-00-00T00:00:00Z", 
    })
    @IsNotEmpty()
    @IsString()
    activityStart: string
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        description: "Start date of the activity in yy/mm/dd format",
        type: String,
        example: "0000-00-00T00:00:00Z", 
    })
    activityEnd: string
    @IsOptional()
    @IsInt()
    speakerId: number
    @IsOptional()
    @IsInt()
    eventId: number
}