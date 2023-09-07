import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Job-board API')
    .setVersion('1.0')
    .build(); // завершаем конфигурирование вызовом build

  const document = SwaggerModule.createDocument(app, config);

  // первый аргумент - путь, по которому будет доступна
  // веб-страница с документацией Swagger
  SwaggerModule.setup('/api/docs', app, document);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
