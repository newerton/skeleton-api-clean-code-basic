import { Repository, SelectQueryBuilder } from 'typeorm';

import { Optional } from '@core/@shared/domain/type/CommonTypes';
import { Example } from '@core/example/domain/entity/Example';
import { ExampleRepository } from '@core/example/domain/port/repository/ExampleRepository';

import { TypeOrmExampleMapper } from '../entities/mapper/TypeOrmExampleMapper';
import { TypeOrmExample } from '../entities/TypeOrmExample';

export class TypeOrmExampleRepositoryAdapter
  implements ExampleRepository<Example>
{
  private readonly userAlias: string = 'example';
  constructor(private repository: Repository<TypeOrmExample>) {}

  async create(payload: Example): Promise<void> {
    const orm: TypeOrmExample = TypeOrmExampleMapper.toOrmEntity(payload);
    await this.repository.save(orm);
  }

  async update(id: string, payload: Example): Promise<void> {
    await this.findById(id);
    const orm: TypeOrmExample = TypeOrmExampleMapper.toOrmEntity(payload);
    await this.repository.update(orm.id, orm);
  }

  async delete(id: string): Promise<void> {
    await this.findById(id);
    await this.repository.softDelete(id);
  }

  public async findOne(filter: {
    id?: string;
    name?: string;
  }): Promise<Optional<Example>> {
    let domainEntity: Optional<Example>;

    const query: SelectQueryBuilder<TypeOrmExample> = this.buildQueryBuilder();

    this.extendQueryWithByProperties(filter, query);

    const ormEntity: Optional<TypeOrmExample> = await query.getOne();

    if (ormEntity) {
      domainEntity = TypeOrmExampleMapper.toDomainEntity(ormEntity);
    }

    return domainEntity;
  }

  async findAll(): Promise<Example[]> {
    let domainEntities: Optional<Example[]>;

    const query: SelectQueryBuilder<TypeOrmExample> = this.buildQueryBuilder();

    const ormEntity: Optional<TypeOrmExample[]> = await query
      .orderBy({ created_at: 'DESC' })
      .getMany();

    if (ormEntity) {
      domainEntities = TypeOrmExampleMapper.toDomainEntities(ormEntity);
    }

    return domainEntities;
  }

  async findById(id: string): Promise<Optional<Example>> {
    let domainEntity: Optional<Example>;

    const query: SelectQueryBuilder<TypeOrmExample> = this.buildQueryBuilder();

    this.extendQueryWithByProperties({ id: id }, query);

    const ormEntity: Optional<TypeOrmExample> = await query.getOne();

    if (ormEntity) {
      domainEntity = TypeOrmExampleMapper.toDomainEntity(ormEntity);
    }

    return domainEntity;
  }

  private buildQueryBuilder(): SelectQueryBuilder<TypeOrmExample> {
    return this.repository.createQueryBuilder(this.userAlias).select();
  }

  private extendQueryWithByProperties(
    filter: { id?: string; name?: string },
    query: SelectQueryBuilder<TypeOrmExample>,
  ): void {
    if (filter.id) {
      query.andWhere(`"${this.userAlias}"."id" = :id`, { id: filter.id });
    }
    if (filter.name) {
      query.andWhere(`"${this.userAlias}"."name" LIKE :name`, {
        name: filter.name,
      });
    }
  }
}
