import { Module } from '@nestjs/common';
import { SeederController } from './seeder.controller';
import { SeederService } from './seeder.service';
import preloadData from 'src/utils/preloadData';

@Module({
  imports: [],
  controllers: [SeederController],
  providers: [
    SeederService,
    {
      provide: 'preload',
      useValue: preloadData,
    },
  ],
})
export class SeederModule {}
