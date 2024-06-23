import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';

import { ApiServerConfig } from '@app/@common/config/app.config';
import { applySwagger } from '@app/@common/config/swagger.config';

import { MainModule } from './main.module';

const logger = new Logger('Main');

async function bootstrap() {
  const app = await NestFactory.create(MainModule);

  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe());

  app.enableShutdownHooks();

  applySwagger(app);

  await app.listen(ApiServerConfig.PORT).then(() => {
    logger.log(
      `skeleton-api is running in http://localhost:${ApiServerConfig.PORT}`,
    );
  });
}

bootstrap();
