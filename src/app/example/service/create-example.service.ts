import { Injectable } from '@nestjs/common';

import { Code } from '@core/@shared/domain/error/Code';
import { Exception } from '@core/@shared/domain/exception/Exception';
import { CoreAssert } from '@core/@shared/domain/utils/assert/CoreAssert';
import { CreateExampleUseCase } from '@core/example/application/use-case/CreateExampleUseCase';
import { ExampleUseCaseDto } from '@core/example/application/use-case/dto/ExampleUseCaseDto';
import { Example } from '@core/example/domain/entity/Example';
import { ExampleRepository } from '@core/example/domain/port/repository/ExampleRepository';
import { CreateExamplePort } from '@core/example/domain/port/use-case/CreateExamplePort';

@Injectable()
export class CreateExampleService implements CreateExampleUseCase {
  constructor(private readonly repository: ExampleRepository<Example>) {}

  public async execute(payload: CreateExamplePort): Promise<ExampleUseCaseDto> {
    const doesExampleExist = !!(await this.repository.findOne({
      name: payload.name,
    }));

    CoreAssert.isFalse(
      doesExampleExist,
      Exception.new({
        code: Code.ENTITY_ALREADY_EXISTS_ERROR,
        overrideMessage: 'Example already exists.',
      }),
    );

    const user: Example = await Example.create({
      name: payload.name,
      password: payload.password,
      is_active: payload.is_active,
    });

    await this.repository.create(user);

    return ExampleUseCaseDto.newFromExample(user);
  }
}
