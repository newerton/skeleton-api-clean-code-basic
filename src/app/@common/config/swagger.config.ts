import type { INestApplication } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import type { SwaggerCustomOptions } from '@nestjs/swagger';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SwaggerTheme } from 'swagger-themes';

import { ApiServerConfig } from './app.config';

const logger = new Logger('Swagger');

export const applySwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Skeleton API')
    .setDescription('The Skeleton API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);

  const theme = new SwaggerTheme('v3');
  const customOptions: SwaggerCustomOptions = {
    customSiteTitle: 'Skeleton API Docs',
    customCss: theme.getBuffer('dark'),
    explorer: true,
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
      defaultModelsExpandDepth: -1,
    },
  };
  SwaggerModule.setup('docs', app, document, customOptions);

  logger.log(
    `Documentation is running in http://localhost:${ApiServerConfig.PORT}/docs`,
  );
};
