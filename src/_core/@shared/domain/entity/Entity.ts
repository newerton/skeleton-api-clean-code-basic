import { validate as uuidValidate } from 'uuid';

import { Code } from '../error/Code';
import { Exception } from '../exception/Exception';
import { Optional } from '../type/CommonTypes';
import {
  ClassValidationDetails,
  ClassValidator,
} from '../utils/class-validator/ClassValidator';
import { UniqueEntityUuid } from '../value-object/UniqueEntityUuid';

export abstract class Entity<TProperties, TRules extends object> {
  readonly _id: UniqueEntityUuid;

  constructor(public readonly payload: TProperties, id?: UniqueEntityUuid) {
    this._id = id || new UniqueEntityUuid();
  }

  get id(): string {
    if (!uuidValidate(this._id.value)) {
      throw Exception.new({
        code: Code.ENTITY_VALIDATION_ERROR,
        overrideMessage: `${this.constructor.name}: ID is invalid.`,
      });
    }
    return this._id.value;
  }

  async validate(): Promise<void> {
    const details: Optional<ClassValidationDetails> =
      await ClassValidator.validate(this.validatorRules());
    if (details) {
      throw Exception.new({
        code: Code.ENTITY_VALIDATION_ERROR,
        data: details,
      });
    }
  }

  abstract validatorRules(): TRules;
}
