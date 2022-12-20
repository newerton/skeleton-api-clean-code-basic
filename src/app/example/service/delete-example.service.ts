import { Code } from '@core/@shared/domain/error/Code';
import { Exception } from '@core/@shared/domain/exception/Exception';
import { CoreAssert } from '@core/@shared/domain/utils/assert/CoreAssert';
import { DeleteExampleUseCase } from '@core/example/application/use-case/DeleteExampleUseCase';
import { Example } from '@core/example/domain/entity/Example';
import { ExampleRepository } from '@core/example/domain/port/repository/ExampleRepository';

export class DeleteExampleService implements DeleteExampleUseCase {
  constructor(private readonly repository: ExampleRepository<Example>) {}

  public async execute(id: string): Promise<void> {
    const doesExampleExist = !(await this.repository.findById(id));

    CoreAssert.isFalse(
      doesExampleExist,
      Exception.new({
        code: Code.ENTITY_ALREADY_EXISTS_ERROR,
        overrideMessage: 'Example not exists.',
      }),
    );

    await this.repository.delete(id);
  }
}
