export interface TypedRequest<TBody> extends Request {
  json(): Promise<TBody>;
}
