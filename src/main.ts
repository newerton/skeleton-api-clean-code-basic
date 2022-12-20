import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { ConfigurationInput, Lightship, createLightship } from 'lightship';

import { ApiServerConfig } from '@app/@common/config/app.config';
import { applySwagger } from '@app/@common/config/swagger.config';

import { MainModule } from './main.module';

const logger = new Logger('Main');

async function bootstrap() {
  const configuration: ConfigurationInput = {
    detectKubernetes: ApiServerConfig.ENV !== 'production' ? false : true,
    gracefulShutdownTimeout: 30 * 1000,
    port: 9000,
  };

  const lightship: Lightship = await createLightship(configuration);

  const app = await NestFactory.create(MainModule);

  lightship.registerShutdownHandler(() => app.close());

  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe());

  app.enableShutdownHooks();

  applySwagger(app);

  await app.listen(ApiServerConfig.PORT).then(() => {
    lightship.signalReady();
    logger.log(
      `skeleton-api is running in http://localhost:${ApiServerConfig.PORT}`,
    );
  });
}

bootstrap();
