import { validate as uuidValidate, v4 as uuidv4 } from 'uuid';

import { ValueObject } from './ValueObject';
import { Code } from '../error/Code';
import { Exception } from '../exception/Exception';

export class UniqueEntityUuid extends ValueObject<string> {
  constructor(protected readonly id?: string) {
    super(id || uuidv4());
    this.validate();
  }

  private validate() {
    if (!uuidValidate(this.value)) {
      throw Exception.new({
        code: Code.ENTITY_VALIDATION_ERROR,
        overrideMessage: `${this.constructor.name}: ID is invalid.`,
      });
    }
  }
}
