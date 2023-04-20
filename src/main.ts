import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { CONSTANTS } from './app.constants';
import { AppModule } from './app.module';
import { setupSwagger } from './swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
  });

  app.setGlobalPrefix(CONSTANTS.BASE_ROUTE);

  // Setup Swagger
  setupSwagger(app);
  const configService = app.get(ConfigService);
  const environment = configService.get<string>('NODE_ENV');

  const port = configService.get<number>('port');
  const server = await app.listen(port);
}
bootstrap();
