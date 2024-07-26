import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { ProductsModule } from './modules/products/products.module';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import dbConfig from './config/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from './modules/categories/categories.module';
import { OrdersModule } from './modules/orders/orders.module';
import preloadData from 'src/utils/preloadData';
import { SeederService } from './seeder.service';
import { FilesModule } from './modules/files/files.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtSecret } from './config/envs';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [dbConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return configService.get('typeorm');
      },
    }),
    JwtModule.register({
      global: true,
      secret: jwtSecret,
      signOptions: {
        expiresIn: '1h',
      },
    }),
    AuthModule,
    CategoriesModule,
    FilesModule,
    OrdersModule,
    ProductsModule,
    UsersModule,
  ],
  controllers: [],
  providers: [
    SeederService,
    {
      provide: 'preload',
      useValue: preloadData,
    },
  ],
})
export class AppModule {}
