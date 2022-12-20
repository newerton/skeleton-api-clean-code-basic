import { UniqueEntityUuid } from '@core/@shared/domain/value-object/UniqueEntityUuid';
import { Example } from '@core/example/domain/entity/Example';

import { TypeOrmExample } from '../TypeOrmExample';

export class TypeOrmExampleMapper {
  public static toOrmEntity(domain: Example): TypeOrmExample {
    const orm: TypeOrmExample = new TypeOrmExample();

    orm.id = domain._id.value;
    orm.name = domain.name;
    orm.password = domain.password;
    orm.is_active = domain.is_active;

    orm.created_at = domain.created_at;
    orm.updated_at = domain.updated_at;
    orm.deleted_at = domain.deleted_at;

    return orm;
  }

  public static toOrmEntities(domainExamples: Example[]): TypeOrmExample[] {
    return domainExamples.map((domainExample) =>
      this.toOrmEntity(domainExample),
    );
  }

  public static toDomainEntity(orm: TypeOrmExample): Example {
    const domainExample: Example = new Example(
      {
        name: orm.name,
        is_active: orm.is_active,
        password: orm.password,
        created_at: orm.created_at,
        updated_at: orm.updated_at,
        deleted_at: orm.deleted_at,
      },
      new UniqueEntityUuid(orm.id),
    );

    return domainExample;
  }

  public static toDomainEntities(orms: TypeOrmExample[]): Example[] {
    return orms.map((orm) => this.toDomainEntity(orm));
  }
}
