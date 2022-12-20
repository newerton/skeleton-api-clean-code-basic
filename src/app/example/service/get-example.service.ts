import { Code } from '@core/@shared/domain/error/Code';
import { Exception } from '@core/@shared/domain/exception/Exception';
import { CoreAssert } from '@core/@shared/domain/utils/assert/CoreAssert';
import { ExampleUseCaseDto } from '@core/example/application/use-case/dto/ExampleUseCaseDto';
import { GetExampleUseCase } from '@core/example/application/use-case/GetExampleUseCase';
import { Example } from '@core/example/domain/entity/Example';
import { ExampleRepository } from '@core/example/domain/port/repository/ExampleRepository';

export class GetExampleService implements GetExampleUseCase {
  constructor(private readonly repository: ExampleRepository<Example>) {}

  public async execute(id: string): Promise<ExampleUseCaseDto> {
    const item = await this.repository.findById(id);

    CoreAssert.isFalse(
      !item,
      Exception.new({
        code: Code.ENTITY_NOT_FOUND_ERROR,
        overrideMessage: 'Example not exists.',
      }),
    );

    return ExampleUseCaseDto.newFromExample(item);
  }
}
