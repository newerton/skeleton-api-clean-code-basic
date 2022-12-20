import { Module, Provider } from '@nestjs/common';
import { getDataSourceToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { ExampleDITokens } from '@core/example/domain/di/ExampleDITokens';
import { TypeOrmExample } from '@core/example/infrastructure/adapter/persistence/typeorm/entities/TypeOrmExample';
import { TypeOrmExampleRepositoryAdapter } from '@core/example/infrastructure/adapter/persistence/typeorm/repository/TypeOrmExampleRepositoryAdapter';

import { ExampleController } from './example.controller';
import { CreateExampleService } from './service/create-example.service';
import { DeleteExampleService } from './service/delete-example.service';
import { GetExampleService } from './service/get-example.service';
import { ListAllExampleService } from './service/list-all-example.service';
import { UpdateExampleService } from './service/update-example.service';

const persistenceProviders: Provider[] = [
  {
    provide: ExampleDITokens.ExampleRepository,
    useFactory: (dataSource: DataSource) =>
      new TypeOrmExampleRepositoryAdapter(
        dataSource.getRepository(TypeOrmExample),
      ),
    inject: [getDataSourceToken()],
  },
];

const useCaseProviders: Provider[] = [
  {
    provide: ExampleDITokens.CreateExampleUseCase,
    useFactory: (repository) => new CreateExampleService(repository),
    inject: [ExampleDITokens.ExampleRepository],
  },
  {
    provide: ExampleDITokens.ListAllExampleUseCase,
    useFactory: (repository) => new ListAllExampleService(repository),
    inject: [ExampleDITokens.ExampleRepository],
  },
  {
    provide: ExampleDITokens.GetExampleUseCase,
    useFactory: (repository) => new GetExampleService(repository),
    inject: [ExampleDITokens.ExampleRepository],
  },
  {
    provide: ExampleDITokens.UpdateExampleUseCase,
    useFactory: (repository) => new UpdateExampleService(repository),
    inject: [ExampleDITokens.ExampleRepository],
  },
  {
    provide: ExampleDITokens.DeleteExampleUseCase,
    useFactory: (repository) => new DeleteExampleService(repository),
    inject: [ExampleDITokens.ExampleRepository],
  },
];

// const handlerProviders: Provider[] = [
//   NestWrapperGetExamplePreviewQueryHandler,
//   {
//     provide: ExampleDITokens.GetExamplePreviewQueryHandler,
//     useFactory: (exampleRepository) =>
//       new HandleGetExamplePreviewQueryService(exampleRepository),
//     inject: [ExampleDITokens.ExampleRepository],
//   },
// ];

@Module({
  controllers: [ExampleController],
  providers: [
    ...persistenceProviders,
    ...useCaseProviders,
    // ...handlerProviders,
  ],
  exports: [ExampleDITokens.ExampleRepository],
})
export class ExampleModule {}
