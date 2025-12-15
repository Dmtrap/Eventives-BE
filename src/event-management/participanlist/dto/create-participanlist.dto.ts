import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateParticipanlistDto {
    @IsNotEmpty()
    @IsBoolean()
    @ApiProperty({
        description: 'true/false',
        type: Boolean,
        example: true
    })
    attendance: boolean
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        description: 'Start date of the activity in yy/mm/dd format',
        type: String,
        example: '0000-00-00T00:00:00Z',
      })
    attendanceTime: string
    @IsNotEmpty()
    @IsInt()
    participantId: number
    @IsNotEmpty()
    @IsInt()
    eventId: number
}
