import { UseCase } from '@core/@shared/application/use-case/UseCase';
import { ListAllExamplePort } from '@core/example/domain/port/use-case/ListAllExamplePort';

import { ExampleUseCaseDto } from './dto/ExampleUseCaseDto';

export type ListAllExampleUseCase = UseCase<
  ListAllExamplePort,
  ExampleUseCaseDto[]
>;
