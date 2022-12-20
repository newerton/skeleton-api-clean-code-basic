import * as JoiBase from 'joi';

import {
  JoiValidationException,
  JoiValidationPipe,
  ValidationType,
} from '@app/@common/pipes/joi-validation.pipe';
import { CreateSchema } from '@app/@common/schemas/joi/joi.create-schema.interface';

const Joi = JoiBase;
export class TestSchema implements CreateSchema {
  createSchema(): JoiBase.ObjectSchema {
    return Joi.object({
      name: Joi.string().required(),
    });
  }
}

describe('JoiValidationPipe', () => {
  test('Should validate the name', async () => {
    const testSchema = new TestSchema();
    const joiValidationPipe = new JoiValidationPipe(testSchema);

    const validate = await joiValidationPipe.transform({ name: 'name' });
    expect(validate).toStrictEqual({ name: 'name' });
  });

  test('Should invalidate the name, with number value', async () => {
    const testSchema = new TestSchema();
    const joiValidationPipe = new JoiValidationPipe(testSchema);

    try {
      await joiValidationPipe.transform({ name: 10 });
    } catch (e) {
      const exception: JoiValidationException = e;

      const response: ValidationType =
        exception.getResponse() as ValidationType;

      expect(exception).toBeInstanceOf(JoiValidationException);
      expect(exception.getStatus()).toBe(422);
      expect(response.message).toBe('"name" must be a string');
      expect(response.details).toHaveLength(1);
    }
  });

  test('Should validate all exception details keys', async () => {
    const testSchema = new TestSchema();
    const joiValidationPipe = new JoiValidationPipe(testSchema);

    try {
      await joiValidationPipe.transform({ name: 10 });
    } catch (e) {
      const exception: JoiValidationException = e;

      const response: ValidationType =
        exception.getResponse() as ValidationType;

      response.details.map((item) => {
        const keys = Object.keys(item);

        expect(keys[0]).toBe('message');
        expect(keys[1]).toBe('path');
        expect(keys[2]).toBe('type');
        expect(keys[3]).toBe('context');
      });
    }
  });

  test('Should validate all exception details values', async () => {
    const testSchema: CreateSchema = new TestSchema();
    const joiValidationPipe = new JoiValidationPipe(testSchema);

    try {
      await joiValidationPipe.transform({ name: 10 });
    } catch (e) {
      const exception: JoiValidationException = e;

      const response: ValidationType =
        exception.getResponse() as ValidationType;

      response.details.map((item) => {
        expect(item.message).toBe('"name" must be a string');
        expect(item.path).toEqual(['name']);
        expect(item.type).toBe('string.base');
        expect(item.context).toStrictEqual({
          label: 'name',
          value: 10,
          key: 'name',
        });
      });
    }
  });
});
