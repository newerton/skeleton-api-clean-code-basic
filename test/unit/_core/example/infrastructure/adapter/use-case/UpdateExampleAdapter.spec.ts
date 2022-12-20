import { v4 } from 'uuid';

import { UpdateExamplePort } from '@core/example/domain/port/use-case/UpdateExamplePort';
import { UpdateExampleAdapter } from '@core/example/infrastructure/adapter/use-case/UpdateExampleAdapter';

describe('UpdateExampleAdapter', () => {
  test('Should return all attributes', async () => {
    const customId: string = v4();
    const domain: UpdateExamplePort = {
      id: customId,
      name: 'name',
      password: '123456',
    };

    const useCase = await UpdateExampleAdapter.new(domain);

    expect(useCase).toBeInstanceOf(UpdateExampleAdapter);
    expect(useCase.id).toBe(customId);
    expect(useCase.name).toBe(domain.name);
    expect(useCase.password).toBe(domain.password);
    expect(useCase.is_active).toBeFalsy();
  });

  test('When is_active is set to true, it should return is_active trues', async () => {
    const customId: string = v4();
    const domain: UpdateExamplePort = {
      id: customId,
      name: 'name',
      password: '123456',
      is_active: true,
    };

    const useCase = await UpdateExampleAdapter.new(domain);

    expect(useCase).toBeInstanceOf(UpdateExampleAdapter);
    expect(useCase.name).toBe(domain.name);
    expect(useCase.password).toBe(domain.password);
    expect(useCase.is_active).toBeTruthy();
  });
});
