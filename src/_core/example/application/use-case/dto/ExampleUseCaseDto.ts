import { Example } from '@core/example/domain/entity/Example';
import { Exclude, Expose, plainToClass } from 'class-transformer';

@Exclude()
export class ExampleUseCaseDto {
  @Expose()
  public id: string;

  @Expose()
  public name: string;

  @Expose()
  public is_active: boolean;

  public static newFromExample(model: Example): ExampleUseCaseDto {
    return plainToClass(ExampleUseCaseDto, model);
  }

  public static newListFromExamples(models: Example[]): ExampleUseCaseDto[] {
    return models.map((model) => ExampleUseCaseDto.newFromExample(model));
  }
}
