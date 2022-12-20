export class ExampleDITokens {
  // Use-cases
  public static readonly CreateExampleUseCase: unique symbol = Symbol(
    'CreateExampleUseCase',
  );
  public static readonly ListAllExampleUseCase: unique symbol = Symbol(
    'ListAllExampleUseCase',
  );
  public static readonly GetExampleUseCase: unique symbol =
    Symbol('GetExampleUseCase');
  public static readonly UpdateExampleUseCase: unique symbol = Symbol(
    'UpdateExampleUseCase',
  );
  public static readonly DeleteExampleUseCase: unique symbol = Symbol(
    'DeleteExampleUseCase',
  );

  // Handlers
  public static readonly GetExamplePreviewQueryHandler: unique symbol = Symbol(
    'GetExamplePreviewQueryHandler',
  );

  // Repositories
  public static readonly ExampleRepository: unique symbol =
    Symbol('ExampleRepository');
}
