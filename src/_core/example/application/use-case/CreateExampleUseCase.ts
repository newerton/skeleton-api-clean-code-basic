import { UseCase } from '@core/@shared/application/use-case/UseCase';
import { CreateExamplePort } from '@core/example/domain/port/use-case/CreateExamplePort';

import { ExampleUseCaseDto } from './dto/ExampleUseCaseDto';

export type CreateExampleUseCase = UseCase<
  CreateExamplePort,
  ExampleUseCaseDto
>;
