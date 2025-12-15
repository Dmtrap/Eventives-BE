import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { CreateUserDto } from 'src/user-management/users/dto';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  eventName: string;
  @IsString()
  @IsNotEmpty()
  description: string
  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Start date of the activity in yy/mm/dd format',
    type: String,
    example: '0000-00-00T00:00:00Z',
  })
  eventDateStart: string;
  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Start date of the activity in yy/mm/dd format',
    type: String,
    example: '0000-00-00T00:00:00Z',
  })
  eventDateEnd: string;
  @IsBoolean()
  @IsNotEmpty()
  eventStatus: boolean;
  @IsInt()
  @IsNotEmpty()
  eventSeatMax: number;
  @IsInt()
  @IsNotEmpty()
  eventSeatCount: number;
  @IsString()
  @IsNotEmpty()
  eventLogo: string;
  @IsNotEmpty()
  @IsInt()
  userId: number;
  @IsOptional()
  @IsInt()
  eventCategoryId: number;
}

export class CreateVenueDto {
  @IsString()
  @IsNotEmpty()
  venueName: string;
  @IsString()
  @IsNotEmpty()
  venueDesc: string;
  @IsString()
  @IsNotEmpty()
  venueAddress: string;
  @IsString()
  @IsNotEmpty()
  venueCity: string;
  @IsString()
  @IsNotEmpty()
  venueGMapsLocation: string;
  @IsString()
  @IsNotEmpty()
  latitude: string;
  @IsString()
  @IsNotEmpty()
  longitude: string;
}

export class CreateScheduleDto {
  @IsDateString()
  @IsNotEmpty()
  activityStart: string;
  @IsDateString()
  @IsNotEmpty()
  activityEnd: string;
}

export class CreateSponsorDto {
  @IsString()
  @IsNotEmpty()
  sponsorName: string;
  @IsString()
  @IsNotEmpty()
  sponsorWebLink: string;
  @IsString()
  @IsNotEmpty()
  sponsorLogo: string;
}

export class CreateParticipantListDto {
  @IsBoolean()
  @IsNotEmpty()
  attendance: boolean;
  @IsDateString()
  @IsNotEmpty()
  attendanceTime: string;
  participant: CreateUserDto;
  event: CreateEventDto | null;
}

export class CreateEventTicketDto {
  ticketPrice: number;
  description: string;
  seatCount: number;
  seatMax: number;
  saleStart: string;
  saleEnd: string;
  status: boolean;
  event: CreateEventDto | null;
}
