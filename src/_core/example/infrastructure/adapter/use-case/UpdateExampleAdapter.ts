import { Exclude, Expose, Transform, plainToClass } from 'class-transformer';
import { IsBoolean, IsOptional, IsString, IsUUID } from 'class-validator';

import { UseCaseValidatableAdapter } from '@core/@shared/infrastructure/adapter/use-case/UseCaseValidatableAdapter';
import { UpdateExamplePort } from '@core/example/domain/port/use-case/UpdateExamplePort';

@Exclude()
export class UpdateExampleAdapter
  extends UseCaseValidatableAdapter
  implements UpdateExamplePort
{
  @Expose()
  @IsUUID()
  id: string;

  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsString()
  @IsOptional()
  password?: string;

  @Expose()
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => (typeof value === 'boolean' ? value : false))
  is_active?: boolean;

  public static async new(
    payload: UpdateExamplePort,
  ): Promise<UpdateExampleAdapter> {
    const adapter: UpdateExampleAdapter = plainToClass(
      UpdateExampleAdapter,
      payload,
    );
    await adapter.validate();

    return adapter;
  }
}
