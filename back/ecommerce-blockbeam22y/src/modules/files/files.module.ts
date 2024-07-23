import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { CloudinaryConfig } from 'src/config/cloudinary';
import { TypeOrmModule } from '@nestjs/typeorm';
import Product from '../products/products.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [FilesController],
  providers: [CloudinaryConfig, FilesService],
})
export class FilesModule {}
