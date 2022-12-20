export type CodeDescription = {
  code: number;
  error: string;
  message: string;
};

export class Code {
  // Common

  static SUCCESS: CodeDescription = {
    code: 200,
    error: 'SUCCESS',
    message: 'Success.',
  };

  static CREATED: CodeDescription = {
    code: 201,
    error: 'CREATED',
    message: 'Created.',
  };

  static NO_CONTENT: CodeDescription = {
    code: 204,
    error: 'NO_CONTENT',
    message: 'No content.',
  };

  static BAD_REQUEST_ERROR: CodeDescription = {
    code: 400,
    error: 'BAD_REQUEST_ERROR',
    message: 'Bad request.',
  };

  static UNAUTHORIZED_ERROR: CodeDescription = {
    code: 401,
    error: 'UNAUTHORIZED_ERROR',
    message: 'Unauthorized error.',
  };

  static WRONG_CREDENTIALS_ERROR: CodeDescription = {
    code: 402,
    error: 'WRONG_CREDENTIALS_ERROR',
    message: 'Wrong Credentials.',
  };

  static ACCESS_DENIED_ERROR: CodeDescription = {
    code: 403,
    error: 'ACCESS_DENIED_ERROR',
    message: 'Access denied.',
  };

  static UNPROCESSABLE_ENTITY_ERROR: CodeDescription = {
    code: 422,
    error: 'UNPROCESSABLE_ENTITY_ERROR',
    message: 'Unprocessable Entity.',
  };

  static INTERNAL_ERROR: CodeDescription = {
    code: 500,
    error: 'INTERNAL_ERROR',
    message: 'Internal error.',
  };

  static ENTITY_NOT_FOUND_ERROR: CodeDescription = {
    code: 1000,
    error: 'ENTITY_NOT_FOUND_ERROR',
    message: 'Entity not found.',
  };

  static ENTITY_VALIDATION_ERROR: CodeDescription = {
    code: 1001,
    error: 'ENTITY_VALIDATION_ERROR',
    message: 'Entity validation error.',
  };

  static USE_CASE_PORT_VALIDATION_ERROR: CodeDescription = {
    code: 1002,
    error: 'USE_CASE_PORT_VALIDATION_ERROR',
    message: 'Use-case port validation error.',
  };

  static VALUE_OBJECT_VALIDATION_ERROR: CodeDescription = {
    code: 1003,
    error: 'VALUE_OBJECT_VALIDATION_ERROR',
    message: 'Value object validation error.',
  };

  static ENTITY_ALREADY_EXISTS_ERROR: CodeDescription = {
    code: 1004,
    error: 'ENTITY_ALREADY_EXISTS_ERROR',
    message: 'Entity already exists.',
  };
}
