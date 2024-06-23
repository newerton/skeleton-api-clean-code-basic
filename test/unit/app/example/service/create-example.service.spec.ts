import { Test, TestingModule } from '@nestjs/testing';

import { CreateExampleService } from '@app/example/service/create-example.service';
import { Code } from '@core/@shared/domain/error/Code';
import { Exception } from '@core/@shared/domain/exception/Exception';
import { ClassValidationDetails } from '@core/@shared/domain/utils/class-validator/ClassValidator';
import { CreateExampleUseCase } from '@core/example/application/use-case/CreateExampleUseCase';
import { ExampleUseCaseDto } from '@core/example/application/use-case/dto/ExampleUseCaseDto';
import { ExampleDITokens } from '@core/example/domain/di/ExampleDITokens';
import { Example } from '@core/example/domain/entity/Example';
import { ExampleRepository } from '@core/example/domain/port/repository/ExampleRepository';
import { CreateExamplePort } from '@core/example/domain/port/use-case/CreateExamplePort';
import { TypeOrmExampleRepositoryAdapter } from '@core/example/infrastructure/adapter/persistence/typeorm/repository/TypeOrmExampleRepositoryAdapter';

describe('CreateExampleService', () => {
  let createExampleService: CreateExampleUseCase;
  let repository: ExampleRepository<Example>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ExampleDITokens.CreateExampleUseCase,
          useFactory: (repository) => new CreateExampleService(repository),
          inject: [ExampleDITokens.ExampleRepository],
        },
        {
          provide: ExampleDITokens.ExampleRepository,
          useClass: TypeOrmExampleRepositoryAdapter,
        },
      ],
    }).compile();

    createExampleService = module.get<CreateExampleUseCase>(
      ExampleDITokens.CreateExampleUseCase,
    );
    repository = module.get<ExampleRepository<Example>>(
      ExampleDITokens.ExampleRepository,
    );
  });

  describe('execute', () => {
    test('Expect it creates example', async () => {
      jest.spyOn(repository, 'findOne').mockImplementation(async () => null);
      jest.spyOn(repository, 'create').mockImplementation();

      jest.spyOn(repository, 'create').mockClear();

      const createExamplePort: CreateExamplePort = createPort();

      const expected: Example = await Example.create({
        name: createExamplePort.name,
        password: createExamplePort.password,
      });

      const expectedUseCaseDto: ExampleUseCaseDto =
        ExampleUseCaseDto.newFromExample(expected);

      const resultUseCaseDto: ExampleUseCaseDto =
        await createExampleService.execute(createExamplePort);
      Reflect.set(resultUseCaseDto, 'id', expectedUseCaseDto.id);

      const result: Example = jest.spyOn(repository, 'create').mock.calls[0][0];

      Reflect.set(result, 'id', expected.id);
      Reflect.set(result, 'name', expected.name);
      Reflect.set(result, 'created_at', expected.created_at);
      Reflect.set(result, 'updated_at', expected.updated_at);
      Reflect.set(result, 'password', expected.password);

      expect(resultUseCaseDto).toEqual(expectedUseCaseDto);
      expect(result.payload).toEqual(expected.payload);
    });

    test('When example already exists, expect it throws Exception', async () => {
      jest.spyOn(repository, 'findOne').mockImplementation(
        async () =>
          ({
            id: '10',
            name: 'name',
            is_active: false,
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: null,
          }) as Example,
      );

      expect.hasAssertions();

      try {
        const createExamplePort: CreateExamplePort = createPort();
        await createExampleService.execute(createExamplePort);
      } catch (e) {
        const exception: Exception<ClassValidationDetails> =
          e as Exception<ClassValidationDetails>;

        expect(exception).toBeInstanceOf(Exception);
        expect(exception.code).toBe(Code.ENTITY_ALREADY_EXISTS_ERROR.code);
      }
    });
  });
});

function createPort(): CreateExamplePort {
  return {
    name: 'name',
    password: '123456',
  };
}
