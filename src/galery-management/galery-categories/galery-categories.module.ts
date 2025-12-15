import { Module } from '@nestjs/common';
import { GaleryCategoriesService } from './galery-categories.service';
import { GaleryCategoriesController } from './galery-categories.controller';

@Module({
  controllers: [GaleryCategoriesController],
  providers: [GaleryCategoriesService],
})
export class GaleryCategoriesModule {}
