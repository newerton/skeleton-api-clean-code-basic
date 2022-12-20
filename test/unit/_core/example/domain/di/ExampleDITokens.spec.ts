import { ExampleDITokens } from '@core/example/domain/di/ExampleDITokens';

describe('ExampleDITokens', () => {
  test('Should validate the CreateExampleUseCase Symbol', () => {
    const createExampleUseCase =
      ExampleDITokens.CreateExampleUseCase.toString();

    expect(createExampleUseCase).toEqual(
      Symbol.for('CreateExampleUseCase').toString(),
    );
  });

  test('Should validate the ListAllExampleUseCase Symbol', () => {
    const listAllExampleUseCase =
      ExampleDITokens.ListAllExampleUseCase.toString();

    expect(listAllExampleUseCase).toEqual(
      Symbol.for('ListAllExampleUseCase').toString(),
    );
  });

  test('Should validate the GetExampleUseCase Symbol', () => {
    const getExampleUseCase = ExampleDITokens.GetExampleUseCase.toString();

    expect(getExampleUseCase).toEqual(
      Symbol.for('GetExampleUseCase').toString(),
    );
  });

  test('Should validate the UpdateExampleUseCase Symbol', () => {
    const updateExampleUseCase =
      ExampleDITokens.UpdateExampleUseCase.toString();

    expect(updateExampleUseCase).toEqual(
      Symbol.for('UpdateExampleUseCase').toString(),
    );
  });

  test('Should validate the DeleteExampleUseCase Symbol', () => {
    const deleteExampleUseCase =
      ExampleDITokens.DeleteExampleUseCase.toString();

    expect(deleteExampleUseCase).toEqual(
      Symbol.for('DeleteExampleUseCase').toString(),
    );
  });

  test('Should validate the ExampleRepository Symbol', () => {
    const exampleRepository = ExampleDITokens.ExampleRepository.toString();

    expect(exampleRepository).toEqual(
      Symbol.for('ExampleRepository').toString(),
    );
  });
});
