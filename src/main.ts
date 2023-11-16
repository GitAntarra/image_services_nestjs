import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './utils/response/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const APP_PORT = configService.get<string>('APP_PORT');

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('Image Galeries Service')
    .setDescription('This API Documentation of services Images')
    .setVersion('1.0')
    .addBearerAuth({
      description: 'Set JWT Authorization',
      type: 'http',
      in: 'header',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    })
    .addServer('')
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    ignoreGlobalPrefix: true,
  });
  SwaggerModule.setup('api', app, document);

  await app.listen(APP_PORT);
  Logger.log(`🚀 Application is running on: http://localhost:${APP_PORT}`);
}
bootstrap();
