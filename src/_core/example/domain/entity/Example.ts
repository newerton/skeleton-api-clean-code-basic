import { compare, genSalt, hash } from 'bcryptjs';

import { Entity } from '@core/@shared/domain/entity/Entity';
import { Replace } from '@core/@shared/domain/type/CommonTypes';
import { UniqueEntityUuid } from '@core/@shared/domain/value-object/UniqueEntityUuid';

import { ExampleValidationRules } from '../validator/ExampleValidationRules';
import { CreateExampleEntityPayload } from './type/CreateExampleEntityPayload';
import { EditExampleEntityPayload } from './type/EditExampleEntityPayload';
import { ExampleProperties } from './type/ExampleProperties';

export class Example extends Entity<ExampleProperties, ExampleValidationRules> {
  constructor(
    public readonly payload: Replace<ExampleProperties, { createdAt?: Date }>,
    id?: UniqueEntityUuid,
  ) {
    super(payload, id);
    this.is_active = payload.is_active ?? false;
    this.created_at = payload.created_at ?? new Date();
    this.updated_at = payload.updated_at ?? this.created_at;
    this.deleted_at = payload.deleted_at ?? null;
  }

  validatorRules(): ExampleValidationRules {
    return new ExampleValidationRules(this.payload);
  }

  activate() {
    this.payload.is_active = true;
  }

  deactivate() {
    this.payload.is_active = false;
  }

  get name() {
    return this.payload.name;
  }

  private set name(value: string) {
    this.payload.name = value;
  }

  get password() {
    return this.payload.password;
  }

  private set password(value: string) {
    this.payload.password = value;
  }

  get is_active() {
    return this.payload.is_active;
  }

  private set is_active(value: boolean) {
    this.payload.is_active = value;
  }

  get created_at() {
    return this.payload.created_at;
  }

  private set created_at(value: Date) {
    this.payload.created_at = value;
  }

  get updated_at() {
    return this.payload.updated_at;
  }

  private set updated_at(value: Date) {
    this.payload.updated_at = value;
  }

  get deleted_at() {
    return this.payload.deleted_at;
  }

  private set deleted_at(value: Date) {
    this.payload.deleted_at = value;
  }

  public async hashPassword(): Promise<void> {
    const salt: string = await genSalt();
    this.password = await hash(this.password, salt);

    await this.validate();
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.password);
  }

  public static async create(
    payload: CreateExampleEntityPayload,
  ): Promise<Example> {
    const model: Example = new Example(payload);
    await model.hashPassword();
    await model.validate();

    return model;
  }

  public async update(payload: EditExampleEntityPayload): Promise<void> {
    const currentDate: Date = new Date();

    if (this.name !== payload.name && payload.name) {
      this.name = payload.name;
      this.updated_at = currentDate;
    }

    if (this.is_active !== payload.is_active && payload.is_active) {
      this.is_active = payload.is_active;
      this.updated_at = currentDate;
    }

    await this.validate();
  }

  public async remove(): Promise<void> {
    this.is_active = false;
    this.deleted_at = new Date();
    await this.validate();
  }
}
