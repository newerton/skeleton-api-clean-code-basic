import { ExampleUseCaseDto } from '@core/example/application/use-case/dto/ExampleUseCaseDto';
import { ListAllExampleUseCase } from '@core/example/application/use-case/ListAllExampleUseCase';
import { Example } from '@core/example/domain/entity/Example';
import { ExampleRepository } from '@core/example/domain/port/repository/ExampleRepository';

export class ListAllExampleService implements ListAllExampleUseCase {
  constructor(private readonly repository: ExampleRepository<Example>) {}

  public async execute(): Promise<ExampleUseCaseDto[]> {
    const items: Example[] = await this.repository.findAll();

    return ExampleUseCaseDto.newListFromExamples(items);
  }
}
