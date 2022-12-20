import { IsString } from 'class-validator';

import { Code } from '@core/@shared/domain/error/Code';
import { Exception } from '@core/@shared/domain/exception/Exception';
import { ClassValidationDetails } from '@core/@shared/domain/utils/class-validator/ClassValidator';
import { UseCaseValidatableAdapter } from '@core/@shared/infrastructure/adapter/use-case/UseCaseValidatableAdapter';

class MockAdapter extends UseCaseValidatableAdapter {
  @IsString()
  public stringProperty: string;

  constructor(stringProperty: string) {
    super();
    this.stringProperty = stringProperty;
  }
}

describe('UseCaseValidatableAdapter', () => {
  describe('validate', () => {
    test("When MockAdapter is valid, expect it doesn't throw Exception", async () => {
      const validInstance: MockAdapter = new MockAdapter('42');
      await expect(validInstance.validate()).resolves.toBeUndefined();
    });

    test('When MockAdapter is not valid, expect it throws Exception', async () => {
      const stringProperty: unknown = 42;
      const invalidInstance: MockAdapter = new MockAdapter(
        stringProperty as string,
      );

      expect.hasAssertions();

      try {
        await invalidInstance.validate();
      } catch (e) {
        const exception: Exception<ClassValidationDetails> =
          e as Exception<ClassValidationDetails>;

        expect(exception).toBeInstanceOf(Exception);
        expect(exception.code).toBe(Code.USE_CASE_PORT_VALIDATION_ERROR.code);
        expect(exception.data.errors[0].property).toBe('stringProperty');
      }
    });
  });
});
