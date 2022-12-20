import { IsNumber, IsString } from 'class-validator';

import { Optional } from '@core/@shared/domain/type/CommonTypes';
import {
  ClassValidationDetails,
  ClassValidator,
} from '@core/@shared/domain/utils/class-validator/ClassValidator';

class MockClass {
  @IsString()
  public stringProperty: string;

  @IsNumber()
  public numberProperty: number;

  constructor(stringProperty: string, numberProperty: number) {
    this.stringProperty = stringProperty;
    this.numberProperty = numberProperty;
  }
}

describe('ClassValidator', () => {
  describe('validate', () => {
    test("When MockClass is valid, expect it doesn't return validation details", async () => {
      const validInstance: MockClass = new MockClass('42', 42);
      await expect(
        ClassValidator.validate(validInstance),
      ).resolves.toBeUndefined();
    });

    test('When MockClass is not valid, expect it returns object with validation details', async () => {
      const stringProperty: unknown = 42;
      const numberProperty: unknown = '42';

      const invalidInstance: MockClass = new MockClass(
        stringProperty as string,
        numberProperty as number,
      );
      const validationDetails: Optional<ClassValidationDetails> =
        await ClassValidator.validate(invalidInstance);

      expect(validationDetails).toBeDefined();
      expect(validationDetails.context).toBe('MockClass');
      expect(validationDetails.errors[0].property).toBe('stringProperty');
      expect(validationDetails.errors[1].property).toBe('numberProperty');
    });

    test('When MockClass is not valid, expect it returns object with error message empty', async () => {
      const stringProperty: unknown = 42;
      const numberProperty: unknown = '42';

      const invalidInstance: MockClass = new MockClass(
        stringProperty as string,
        numberProperty as number,
      );
      jest
        .spyOn(ClassValidator, 'validate')
        .mockImplementationOnce(async () => {
          const details: Optional<ClassValidationDetails> = {
            context: 'MockClass',
            errors: [
              { property: 'stringProperty', message: [] },
              { property: 'numberProperty', message: [] },
            ],
          };

          return details;
        });
      const validationDetails: Optional<ClassValidationDetails> =
        await ClassValidator.validate(invalidInstance);

      expect(validationDetails).toBeDefined();
      expect(validationDetails.context).toBe('MockClass');
      expect(validationDetails.errors[0].property).toBe('stringProperty');
      expect(validationDetails.errors[1].property).toBe('numberProperty');
      expect(validationDetails.errors[0].message).toEqual([]);
      expect(validationDetails.errors[1].message).toEqual([]);
    });
  });
});
