import { IsString } from 'class-validator';
import { v4 } from 'uuid';

import { Entity } from '@core/@shared/domain/entity/Entity';
import { Code } from '@core/@shared/domain/error/Code';
import { Exception } from '@core/@shared/domain/exception/Exception';
import { ClassValidationDetails } from '@core/@shared/domain/utils/class-validator/ClassValidator';
import { UniqueEntityUuid } from '@core/@shared/domain/value-object/UniqueEntityUuid';

type MockProperties = {
  name: string;
};

class MockEntity extends Entity<MockProperties, MockRules> {
  constructor(public readonly payload: MockProperties, id?: UniqueEntityUuid) {
    super(payload, id);
  }

  validatorRules(): MockRules {
    return new MockRules(this.payload);
  }
}

class MockRules {
  constructor(payload: MockProperties) {
    Object.assign(this, payload);
  }

  @IsString()
  public name: string;
}

describe('Entity', () => {
  describe('getId', () => {
    test('When id is not set, expect it returns UniqueEntityUuid id', async () => {
      const payload = { name: 'Iris' };
      const entity: MockEntity = new MockEntity(payload);

      expect(entity._id).toBeInstanceOf(UniqueEntityUuid);
      expect(entity._id.value).toEqual(entity.id);
      expect(entity._id.toString()).toEqual(entity.id);
    });

    test('When id is set, expect it returns id', async () => {
      const id: UniqueEntityUuid = new UniqueEntityUuid(v4());
      const payload = { name: 'Iris' };
      const entity: MockEntity = new MockEntity(payload, id);

      expect(entity.id).toBe(id.value);
    });

    test('When id is not set, expect new id', async () => {
      const id: UniqueEntityUuid = new UniqueEntityUuid(undefined);
      const payload = { name: 'Iris' };
      const entity: MockEntity = new MockEntity(payload, id);

      expect.hasAssertions();

      expect(entity.id).toBe(id.value);
    });

    test('When id is undefined, expect new InvalidUuidError error', async () => {
      try {
        new UniqueEntityUuid('undefined');
      } catch (e) {
        const exception: Exception<ClassValidationDetails> =
          e as Exception<ClassValidationDetails>;

        expect(exception).toBeInstanceOf(Exception);
        expect(exception.message).toBe('UniqueEntityUuid: ID is invalid.');
        expect(exception.code).toBe(Code.ENTITY_VALIDATION_ERROR.code);
        expect(exception.data).toBeUndefined();
      }
    });

    test('When id is undefined, expect Entity ID is invalid', async () => {
      const id: any = '10';
      const payload = { name: 'Iris' };
      const entity: MockEntity = new MockEntity(payload, id);

      expect.hasAssertions();

      try {
        expect(entity.id).toBe(id.value);
      } catch (e) {
        const exception: Exception<ClassValidationDetails> =
          e as Exception<ClassValidationDetails>;

        expect(exception).toBeInstanceOf(Exception);
        expect(exception.message).toBe(`${MockEntity.name}: ID is invalid.`);
        expect(exception.code).toBe(Code.ENTITY_VALIDATION_ERROR.code);
        expect(exception.data).toBeUndefined();
      }
    });
  });

  describe('validate', () => {
    test("When MockEntity is valid, expect it doesn't throw Exception", async () => {
      const id: UniqueEntityUuid = new UniqueEntityUuid(v4());
      const payload = { name: 'Iris' };
      const validEntity: MockEntity = new MockEntity(payload, id);
      await expect(validEntity.validate()).resolves.toBeUndefined();
    });

    test('When MockEntity is not valid, expect it throws Exception', async () => {
      const id: UniqueEntityUuid = new UniqueEntityUuid(v4());
      const payload = { name: 81 as any };
      const invalidEntity: MockEntity = new MockEntity(payload, id);

      expect.hasAssertions();

      try {
        await invalidEntity.validate();
      } catch (e) {
        const exception: Exception<ClassValidationDetails> =
          e as Exception<ClassValidationDetails>;

        expect(exception).toBeInstanceOf(Exception);
        expect(exception.code).toBe(Code.ENTITY_VALIDATION_ERROR.code);
        expect(exception.data.errors[0].property).toBe('name');
      }
    });
  });
});
