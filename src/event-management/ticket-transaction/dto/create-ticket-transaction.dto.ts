import { IsInt, IsNotEmpty } from "class-validator";

export class CreateTicketTransactionDto {
    @IsNotEmpty()
    @IsInt()
    participantId: number
    @IsNotEmpty()
    @IsInt()
    ticketId: number
}
