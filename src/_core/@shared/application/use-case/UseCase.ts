export interface UseCase<Input, Output> {
  execute(input?: Input, id?: string): Output | Promise<Output>;
}
