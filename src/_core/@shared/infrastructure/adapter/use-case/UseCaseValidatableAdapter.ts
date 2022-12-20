import { Code } from '@core/@shared/domain/error/Code';
import { Exception } from '@core/@shared/domain/exception/Exception';
import { Optional } from '@core/@shared/domain/type/CommonTypes';
import {
  ClassValidationDetails,
  ClassValidator,
} from '@core/@shared/domain/utils/class-validator/ClassValidator';

export class UseCaseValidatableAdapter {
  public async validate(): Promise<void> {
    const details: Optional<ClassValidationDetails> =
      await ClassValidator.validate(this);

    if (details) {
      throw Exception.new({
        code: Code.USE_CASE_PORT_VALIDATION_ERROR,
        data: details,
      });
    }
  }
}
