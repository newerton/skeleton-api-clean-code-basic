import { Test, TestingModule } from '@nestjs/testing';
import { v4 } from 'uuid';

import { GetExampleService } from '@app/example/service/get-example.service';
import { Code } from '@core/@shared/domain/error/Code';
import { Exception } from '@core/@shared/domain/exception/Exception';
import { ClassValidationDetails } from '@core/@shared/domain/utils/class-validator/ClassValidator';
import { ExampleUseCaseDto } from '@core/example/application/use-case/dto/ExampleUseCaseDto';
import { GetExampleUseCase } from '@core/example/application/use-case/GetExampleUseCase';
import { ExampleDITokens } from '@core/example/domain/di/ExampleDITokens';
import { Example } from '@core/example/domain/entity/Example';
import { ExampleRepository } from '@core/example/domain/port/repository/ExampleRepository';
import { TypeOrmExampleRepositoryAdapter } from '@core/example/infrastructure/adapter/persistence/typeorm/repository/TypeOrmExampleRepositoryAdapter';

describe('GetExampleService', () => {
  let getExampleService: GetExampleUseCase;
  let repository: ExampleRepository<Example>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ExampleDITokens.GetExampleUseCase,
          useFactory: (repository) => new GetExampleService(repository),
          inject: [ExampleDITokens.ExampleRepository],
        },
        {
          provide: ExampleDITokens.ExampleRepository,
          useClass: TypeOrmExampleRepositoryAdapter,
        },
      ],
    }).compile();

    getExampleService = module.get<GetExampleUseCase>(
      ExampleDITokens.GetExampleUseCase,
    );
    repository = module.get<ExampleRepository<Example>>(
      ExampleDITokens.ExampleRepository,
    );
  });

  describe('execute', () => {
    test('Expect it returns example', async () => {
      const mockExample: Example = await createExample();

      jest
        .spyOn(repository, 'findById')
        .mockImplementation(async () => mockExample);

      const expectedExampleUseCaseDto: ExampleUseCaseDto =
        await ExampleUseCaseDto.newFromExample(mockExample);

      const resultExampleUseCaseDto: ExampleUseCaseDto =
        await getExampleService.execute(mockExample.id);

      expect(resultExampleUseCaseDto).toEqual(expectedExampleUseCaseDto);
    });

    test('When example not found, expect it throws Exception', async () => {
      jest
        .spyOn(repository, 'findById')
        .mockImplementation(async () => undefined);

      expect.hasAssertions();

      try {
        await getExampleService.execute(v4());
      } catch (e) {
        const exception: Exception<ClassValidationDetails> =
          e as Exception<ClassValidationDetails>;

        expect(exception).toBeInstanceOf(Exception);
        expect(exception.code).toBe(Code.ENTITY_NOT_FOUND_ERROR.code);
      }
    });
  });
});

async function createExample(): Promise<Example> {
  return Example.create({
    name: 'name',
    password: v4(),
  });
}
