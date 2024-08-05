import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from './middlewares/logger.middleware';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.use(logger);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Nest Ecommerce API')
    .setDescription(
      'API for managing an electronic products store, including operations for products, categories, and orders.',
    )
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
