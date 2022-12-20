import { UseCase } from '@core/@shared/application/use-case/UseCase';
import { UpdateExamplePort } from '@core/example/domain/port/use-case/UpdateExamplePort';

import { ExampleUseCaseDto } from './dto/ExampleUseCaseDto';

export type UpdateExampleUseCase = UseCase<
  UpdateExamplePort,
  ExampleUseCaseDto
>;
