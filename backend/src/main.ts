import './crypto-polyfill';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import { LoggerFactory } from './logger/logger.factory';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  // Устанавливаем глобальный префикс
  app.setGlobalPrefix('api/afisha');

  // Подключаем логгер из переменной окружения
  const logger = LoggerFactory.createLoggerFromEnv();
  app.useLogger(logger);

  // Включаем валидацию
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Включаем CORS
  app.enableCors();

  await app.listen(3000);

  // Логируем запуск приложения
  logger.log(`Application is running on: ${await app.getUrl()}`);
  logger.log(`Logger type: ${process.env.LOGGER_TYPE || 'dev'}`);
}
bootstrap();
