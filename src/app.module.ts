import { Module } from '@nestjs/common';
import { EventCategoriesModule } from './event-management/event-categories/event-categories.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './user-management/auth/auth.module';
import { RolesModule } from './user-management/roles/roles.module';
import { UsersModule } from './user-management/users/users.module';
import { GoogleModule } from './auth/google/google.module';
import { AuthController } from './auth/auth.controller';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { PrismaService } from './prisma/prisma.service';
import { MailService } from './auth/mail.service';
import { EventsModule } from './event-management/events/events.module';
// import { RolesGuard } from './user-management/roles/guard/roles.guard';
// import { APP_GUARD } from '@nestjs/core';
import { BannerModule } from './event-management/banner/banner.module';
import { ScheduleModule } from './event-management/schedule/schedule.module';
import { VenueModule } from './event-management/venue/venue.module';
import { SponsorModule } from './event-management/sponsor/sponsor.module';
import { ParticipanlistModule } from './event-management/participanlist/participanlist.module';
import { EventTicketModule } from './event-management/event-ticket/event-ticket.module';
import { TicketTransactionModule } from './event-management/ticket-transaction/ticket-transaction.module';
import { GaleryModule } from './galery-management/galery/galery.module';
import { GaleryCategoriesModule } from './galery-management/galery-categories/galery-categories.module';
import { SpeakerModule } from './event-management/speaker/speaker.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    EventCategoriesModule,
    PrismaModule,
    AuthModule,
    RolesModule,
    UsersModule,
    GoogleModule,
    EventsModule,
    BannerModule,
    ScheduleModule,
    VenueModule,
    SponsorModule,
    ParticipanlistModule,
    EventTicketModule,
    TicketTransactionModule,
    GaleryModule,
    GaleryCategoriesModule,
    SpeakerModule,
  ],
  controllers: [AuthController],
  providers: [
    AppService,
    AuthService,
    PrismaService,
    MailService,
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard,
    // },
  ],
})
export class AppModule {}
