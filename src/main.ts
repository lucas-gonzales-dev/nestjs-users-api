import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar validação global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Filtro global de exceções para mensagens amigáveis
  app.useGlobalFilters(new HttpExceptionFilter());

  // Habilitar CORS
  app.enableCors();

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`🚀 API rodando em: http://localhost:${port}`);
}
void bootstrap();
