import { validate as uuidValidate, v4 } from 'uuid';

import { Example } from '@core/example/domain/entity/Example';
import { CreateExampleEntityPayload } from '@core/example/domain/entity/type/CreateExampleEntityPayload';

describe('Example', () => {
  describe('new', () => {
    test('When input optional args are empty, expect it creates Example instance with default parameters', async () => {
      const currentDate: number = Date.now();
      const customPassword: string = v4();

      const payload: CreateExampleEntityPayload = {
        name: 'name',
        password: customPassword,
      };

      const model: Example = await Example.create(payload);

      expect(typeof model.id === 'string').toBeTruthy();
      expect(uuidValidate(model.id)).toBeTruthy();
      expect(model.name).toBe(payload.name);
      expect(model.password).not.toBe(customPassword);
      expect(model.is_active).toBeFalsy();
      expect(model.created_at.getTime()).toBeGreaterThanOrEqual(
        currentDate - 5000,
      );
      expect(model.updated_at.getTime()).toBeGreaterThanOrEqual(
        currentDate - 5000,
      );
      expect(model.deleted_at).toBeNull();
    });

    test('When input is_active is true, expect it creates Example instance with default parameters and return is_active true', async () => {
      const currentDate: number = Date.now();
      const customPassword: string = v4();

      const payload: CreateExampleEntityPayload = {
        name: 'name',
        password: customPassword,
        is_active: true,
      };

      const model: Example = await Example.create(payload);

      expect(typeof model.id === 'string').toBeTruthy();
      expect(uuidValidate(model.id)).toBeTruthy();
      expect(model.name).toBe(payload.name);
      expect(model.password).not.toBe(customPassword);
      expect(model.is_active).toBeTruthy();
      expect(model.created_at.getTime()).toBeGreaterThanOrEqual(
        currentDate - 5000,
      );
      expect(model.updated_at.getTime()).toBeGreaterThanOrEqual(
        currentDate - 5000,
      );
      expect(model.deleted_at).toBeNull();
    });
  });

  describe('edit', () => {
    test("When input args are empty, expect it doesn't edit Example instance", async () => {
      const model: Example = await Example.create({
        name: 'name',
        password: v4(),
      });

      await model.update({});

      expect(model.name).toBe('name');
      expect(model.is_active).toBeFalsy();
      expect(model.deleted_at).toBeNull();
    });

    test('When input args are set, expect it edits Example instance', async () => {
      const currentDate: number = Date.now();

      const model: Example = await Example.create({
        name: 'name',
        password: v4(),
      });

      expect(model.is_active).toBeFalsy();

      await model.update({
        name: 'name updated',
        is_active: false,
      });

      expect(model.name).toBe('name updated');
      expect(model.is_active).toBeFalsy();
      expect(model.updated_at.getTime()).toBeGreaterThanOrEqual(
        model.created_at.getTime(),
      );
      expect(model.updated_at.getTime()).toBeGreaterThanOrEqual(
        currentDate - 5000,
      );
      expect(model.deleted_at).toBeNull();
    });

    test('Should active a model', async () => {
      const model: Example = await Example.create({
        name: 'name',
        password: v4(),
      });
      model.activate();
      expect(model.is_active).toBeTruthy();
    });

    test('Should disable a model', async () => {
      const model: Example = await Example.create({
        name: 'name',
        password: v4(),
        is_active: true,
      });
      model.deactivate();
      expect(model.is_active).toBeFalsy();
    });
  });

  describe('remove', () => {
    test('Expect it marks Example instance as removed', async () => {
      const currentDate: number = Date.now();

      const model: Example = await Example.create({
        name: 'name',
        password: v4(),
        is_active: true,
      });

      expect(model.is_active).toBeTruthy();

      await model.remove();

      expect(model.is_active).toBeFalsy();
      expect(model.deleted_at.getTime()).toBeGreaterThanOrEqual(
        currentDate - 5000,
      );
    });
  });

  describe('comparePassword', () => {
    test('When password is correct, expect it returns TRUE', async () => {
      const password: string = v4();

      const model: Example = await Example.create({
        name: 'name',
        password: password,
      });

      await expect(model.comparePassword(password)).resolves.toBeTruthy();
    });

    test('When password is not correct, expect it returns FALSE', async () => {
      const password: string = v4();
      const incorrectPassword: string = password + v4();

      const model: Example = await Example.create({
        name: 'name',
        password: password,
      });

      await expect(
        model.comparePassword(incorrectPassword),
      ).resolves.toBeFalsy();
    });
  });
});
