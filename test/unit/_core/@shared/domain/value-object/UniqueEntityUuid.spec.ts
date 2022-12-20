import { validate as uuidValidate } from 'uuid';

import { Code } from '@core/@shared/domain/error/Code';
import { Exception } from '@core/@shared/domain/exception/Exception';
import { UniqueEntityUuid } from '@core/@shared/domain/value-object/UniqueEntityUuid';

describe('UniqueEntityUuid Unit Tests', () => {
  const validateSpy = jest.spyOn(UniqueEntityUuid.prototype as any, 'validate');

  test('Should throw error when uuid is invalid', () => {
    expect(() => new UniqueEntityUuid('fake id')).toThrow(
      Exception.new({
        code: Code.ENTITY_VALIDATION_ERROR,
        overrideMessage: 'UniqueEntityUuid: ID is invalid.',
      }),
    );
    expect(validateSpy).toHaveBeenCalled();
  });

  test('Should accept a uuid passed in constructor', () => {
    const uuid = '9366b7dc-2d71-4799-b91c-c64adb205104';
    const valueObject = new UniqueEntityUuid(uuid);
    expect(valueObject.value).toBe(uuid);
    expect(validateSpy).toHaveBeenCalled();
  });

  test('Should create a uuid, if not passed in contructor', () => {
    const valueObject = new UniqueEntityUuid();
    expect(uuidValidate(valueObject.value)).toBeTruthy();
    expect(validateSpy).toHaveBeenCalled();
  });
});
