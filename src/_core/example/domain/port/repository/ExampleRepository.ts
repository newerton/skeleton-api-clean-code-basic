import { Entity } from '@core/@shared/domain/entity/Entity';
import { Optional } from '@core/@shared/domain/type/CommonTypes';

import { Example } from '../../entity/Example';
import { ExampleProperties } from '../../entity/type/ExampleProperties';
import { ExampleValidationRules } from '../../validator/ExampleValidationRules';

export interface ExampleRepository<
  T extends Entity<ExampleProperties, ExampleValidationRules>,
> {
  create(payload: T): Promise<void>;
  update(id: string, entity: T): Promise<void>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Optional<T>>;
  findOne(filter: { id?: string; name?: string }): Promise<Optional<Example>>;
  findAll(): Promise<T[]>;
}
