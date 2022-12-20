import { v4 } from 'uuid';

import { ExampleUseCaseDto } from '@core/example/application/use-case/dto/ExampleUseCaseDto';
import { Example } from '@core/example/domain/entity/Example';
import { CreateExampleEntityPayload } from '@core/example/domain/entity/type/CreateExampleEntityPayload';

describe('ExampleUseCaseDto', () => {
  describe('newFromExample', () => {
    test('Expect it create ExampleUseCaseDto instance with required parameters', async () => {
      const model: Example = await createExample();
      const useCaseDto: ExampleUseCaseDto =
        ExampleUseCaseDto.newFromExample(model);

      expect(useCaseDto.id).toBe(model.id);
      expect(useCaseDto.name).toBe(model.name);
      expect(useCaseDto.is_active).toBe(model.is_active);
    });
  });

  describe('newListFromExamples', () => {
    test('Expect it creates ExampleUseCaseDto instances with required parameters', async () => {
      const model: Example = await createExample();
      const useCaseDtos: ExampleUseCaseDto[] =
        ExampleUseCaseDto.newListFromExamples([model]);

      expect(useCaseDtos.length).toBe(1);
      expect(useCaseDtos[0].id).toBe(model.id);
      expect(useCaseDtos[0].name).toBe(model.name);
      expect(useCaseDtos[0].is_active).toBe(model.is_active);
    });
  });
});

async function createExample(): Promise<Example> {
  const createExampleEntityPayload: CreateExampleEntityPayload = {
    name: 'name',
    password: v4(),
    is_active: true,
  };

  return Example.create(createExampleEntityPayload);
}
