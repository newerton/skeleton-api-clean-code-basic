import { Code } from '@core/@shared/domain/error/Code';
import { Exception } from '@core/@shared/domain/exception/Exception';
import { CoreAssert } from '@core/@shared/domain/utils/assert/CoreAssert';
import { ExampleUseCaseDto } from '@core/example/application/use-case/dto/ExampleUseCaseDto';
import { UpdateExampleUseCase } from '@core/example/application/use-case/UpdateExampleUseCase';
import { Example } from '@core/example/domain/entity/Example';
import { ExampleRepository } from '@core/example/domain/port/repository/ExampleRepository';
import { UpdateExamplePort } from '@core/example/domain/port/use-case/UpdateExamplePort';

export class UpdateExampleService implements UpdateExampleUseCase {
  constructor(private readonly repository: ExampleRepository<Example>) {}

  public async execute(payload: UpdateExamplePort): Promise<ExampleUseCaseDto> {
    const doesExampleExist = !(await this.repository.findById(payload.id));

    CoreAssert.isFalse(
      doesExampleExist,
      Exception.new({
        code: Code.ENTITY_ALREADY_EXISTS_ERROR,
        overrideMessage: 'Example not exists.',
      }),
    );

    const model: Example = CoreAssert.notEmpty(
      await this.repository.findById(payload.id),
      Exception.new({
        code: Code.ENTITY_NOT_FOUND_ERROR,
        overrideMessage: 'Example not found.',
      }),
    );

    await model.update({
      name: payload.name,
      is_active: payload.is_active,
    });

    await this.repository.update(payload.id, model);

    return ExampleUseCaseDto.newFromExample(model);
  }
}
