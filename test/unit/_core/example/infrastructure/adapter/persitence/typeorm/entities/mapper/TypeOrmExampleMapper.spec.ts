import { v4 } from 'uuid';

import { Example } from '@core/example/domain/entity/Example';
import { TypeOrmExampleMapper } from '@core/example/infrastructure/adapter/persistence/typeorm/entities/mapper/TypeOrmExampleMapper';
import { TypeOrmExample } from '@core/example/infrastructure/adapter/persistence/typeorm/entities/TypeOrmExample';

describe('TypeOrmExampleMapper', () => {
  test('toOrmEntity', async () => {
    const domain: Example = await Example.create({
      name: 'name',
      password: '123456',
    });

    const toOrmEntity = TypeOrmExampleMapper.toOrmEntity(domain);

    expect(toOrmEntity).toBeInstanceOf(TypeOrmExample);
    expect(toOrmEntity.name).toBe(domain.name);
    expect(toOrmEntity.is_active).toBeFalsy();
    expect(toOrmEntity.created_at).toBeInstanceOf(Date);
    expect(toOrmEntity.updated_at).toBeInstanceOf(Date);
    expect(toOrmEntity.deleted_at).toBeNull();
  });

  test('toOrmEntities', async () => {
    const domain: Example = await Example.create({
      name: 'name',
      password: '123456',
    });

    const toOrmEntities = TypeOrmExampleMapper.toOrmEntities([domain]);

    expect(toOrmEntities[0]).toBeInstanceOf(TypeOrmExample);
    expect(toOrmEntities[0].name).toBe(domain.name);
    expect(toOrmEntities[0].is_active).toBeFalsy();
    expect(toOrmEntities[0].created_at).toBeInstanceOf(Date);
    expect(toOrmEntities[0].updated_at).toBeInstanceOf(Date);
    expect(toOrmEntities[0].deleted_at).toBeNull();
  });

  test('toDomainEntity', async () => {
    const orm: TypeOrmExample = new TypeOrmExample();
    orm.id = v4();
    orm.name = 'name';
    orm.password = '123456';
    orm.is_active = false;
    orm.created_at = new Date();
    orm.updated_at = orm.created_at;
    orm.deleted_at = null;

    const toDomainEntity = TypeOrmExampleMapper.toDomainEntity(orm);

    expect(toDomainEntity).toBeInstanceOf(Example);
    expect(toDomainEntity.id).toBe(orm.id);
    expect(toDomainEntity.name).toBe(orm.name);
    expect(toDomainEntity.is_active).toBe(orm.is_active);
    expect(toDomainEntity.is_active).toBeFalsy();
    expect(toDomainEntity.created_at).toBeInstanceOf(Date);
    expect(toDomainEntity.updated_at).toBeInstanceOf(Date);
    expect(toDomainEntity.updated_at).toEqual(orm.created_at);
    expect(toDomainEntity.deleted_at).toBeNull();
  });

  test('toDomainEntities', async () => {
    const orm: TypeOrmExample = new TypeOrmExample();
    orm.id = v4();
    orm.name = 'name';
    orm.password = '123456';
    orm.is_active = false;
    orm.created_at = new Date();
    orm.updated_at = orm.created_at;
    orm.deleted_at = null;

    const toDomainEntities = TypeOrmExampleMapper.toDomainEntities([orm]);

    expect(toDomainEntities[0]).toBeInstanceOf(Example);
    expect(toDomainEntities[0].id).toBe(orm.id);
    expect(toDomainEntities[0].name).toBe(orm.name);
    expect(toDomainEntities[0].is_active).toBe(orm.is_active);
    expect(toDomainEntities[0].is_active).toBeFalsy();
    expect(toDomainEntities[0].created_at).toBeInstanceOf(Date);
    expect(toDomainEntities[0].updated_at).toBeInstanceOf(Date);
    expect(toDomainEntities[0].updated_at).toEqual(orm.created_at);
    expect(toDomainEntities[0].deleted_at).toBeNull();
  });
});
