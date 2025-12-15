import { Module } from '@nestjs/common';
import { GaleryService } from './galery.service';
import { GaleryController } from './galery.controller';

@Module({
  controllers: [GaleryController],
  providers: [GaleryService],
})
export class GaleryModule {}
