import { TestingModule } from '@nestjs/testing';
import { v4 } from 'uuid';

import { ExampleDITokens } from '@core/example/domain/di/ExampleDITokens';
import { Example } from '@core/example/domain/entity/Example';
import { ExampleRepository } from '@core/example/domain/port/repository/ExampleRepository';

export class ExampleFixture {
  constructor(private readonly testingModule: TestingModule) {}

  public async insertExample(payload: {
    name: string;
    password?: string;
  }): Promise<Example> {
    const repository: ExampleRepository<Example> = this.testingModule.get(
      ExampleDITokens.ExampleRepository,
    );

    const model: Example = await Example.create({
      name: payload.name,
      password: payload.password || v4(),
    });

    await repository.create(model);

    return model;
  }

  public static new(testingModule: TestingModule): ExampleFixture {
    return new ExampleFixture(testingModule);
  }
}
