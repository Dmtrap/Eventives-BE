import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDecimal, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateEventTicketDto {
    @IsNotEmpty()
    @IsString()
    ticketName: string
    @IsNotEmpty()
    @IsString()
    typeTicket: string
    @IsNotEmpty()
    @IsDecimal()
    @ApiProperty({
        description: 'Price Ticket',
        type: String,
        example: '0.00'
    })
    ticketPrice: string
    @IsNotEmpty()
    @IsString()
    description: string
    @IsNotEmpty()
    @IsInt()
    seatCount: number
    @IsNotEmpty()
    @IsInt()
    seatMax: number
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        description: 'Date time',
        type: String,
        example: '0000-00-00T00:00:00Z'
    })
    saleStart: string
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        description: 'Date time',
        type: String,
        example: '0000-00-00T00:00:00Z'
    })
    saleEnd: string
    @IsNotEmpty()
    @IsBoolean()
    status: boolean
    @IsNotEmpty()
    @IsInt()
    eventId: number
}
