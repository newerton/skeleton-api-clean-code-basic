import { CreateExamplePort } from '@core/example/domain/port/use-case/CreateExamplePort';
import { CreateExampleAdapter } from '@core/example/infrastructure/adapter/use-case/CreateExampleAdapter';

describe('CreateExampleAdapter', () => {
  test('Should return all attributes', async () => {
    const domain: CreateExamplePort = {
      name: 'name',
      password: '123456',
    };

    const useCase = await CreateExampleAdapter.new(domain);

    expect(useCase).toBeInstanceOf(CreateExampleAdapter);
    expect(useCase.name).toBe(domain.name);
    expect(useCase.password).toBe(domain.password);
    expect(useCase.is_active).toBeFalsy();
  });

  test('When is_active is set to true, it should return is_active trues', async () => {
    const domain: CreateExamplePort = {
      name: 'name',
      password: '123456',
      is_active: true,
    };

    const useCase = await CreateExampleAdapter.new(domain);

    expect(useCase).toBeInstanceOf(CreateExampleAdapter);
    expect(useCase.name).toBe(domain.name);
    expect(useCase.password).toBe(domain.password);
    expect(useCase.is_active).toBeTruthy();
  });
});
