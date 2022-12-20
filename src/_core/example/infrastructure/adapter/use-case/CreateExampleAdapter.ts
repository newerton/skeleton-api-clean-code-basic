import { Exclude, Expose, Transform, plainToClass } from 'class-transformer';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

import { UseCaseValidatableAdapter } from '@core/@shared/infrastructure/adapter/use-case/UseCaseValidatableAdapter';
import { CreateExamplePort } from '@core/example/domain/port/use-case/CreateExamplePort';

@Exclude()
export class CreateExampleAdapter
  extends UseCaseValidatableAdapter
  implements CreateExamplePort
{
  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsString()
  password: string;

  @Expose()
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => (typeof value === 'boolean' ? value : false))
  is_active?: boolean;

  public static async new(
    payload: CreateExamplePort,
  ): Promise<CreateExampleAdapter> {
    const adapter: CreateExampleAdapter = plainToClass(
      CreateExampleAdapter,
      payload,
    );
    await adapter.validate();

    return adapter;
  }
}
