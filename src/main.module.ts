import { Module, Provider } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';

import { ApiServerConfig } from '@app/@common/config/app.config';
import { HttpExceptionFilter } from '@app/@common/exception-filters/http-exception.filter';
import { JoiValidationExceptionFilter } from '@app/@common/exception-filters/joi-validation-exception.filter';
import { HttpLoggingInterceptor } from '@app/@common/interceptors/http-logging.interceptor';
import { ExampleModule } from '@app/example/example.module';
import { databaseConfig } from '@core/@shared/infrastructure/adapter/persistence/typeorm/DataSource';

const providers: Provider[] = [
  {
    provide: APP_FILTER,
    useClass: HttpExceptionFilter,
  },
  {
    provide: APP_FILTER,
    useClass: JoiValidationExceptionFilter,
  },
  // {
  //   provide: CoreDITokens.CommandBus,
  //   useClass: NestCommandBusAdapter,
  // },
  // {
  //   provide: CoreDITokens.QueryBus,
  //   useClass: NestQueryBusAdapter,
  // },
  // {
  //   provide: CoreDITokens.EventBus,
  //   useClass: NestEventBusAdapter,
  // }
];

if (ApiServerConfig.LOG_ENABLE) {
  providers.push({
    provide: APP_INTERCEPTOR,
    useClass: HttpLoggingInterceptor,
  });
}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DB_DIALECT: Joi.string().required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_USER: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_DATABASE: Joi.string().required(),
        DB_LOGGING: Joi.boolean().required(),
      }),
    }),
    TypeOrmModule.forRoot(databaseConfig),
    ExampleModule,
  ],
  providers,
})
export class MainModule {}
