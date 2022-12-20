import { UseCase } from '@core/@shared/application/use-case/UseCase';

import { ExampleUseCaseDto } from './dto/ExampleUseCaseDto';

export type GetExampleUseCase = UseCase<string, ExampleUseCaseDto>;
