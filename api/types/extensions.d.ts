import '@hapi/hapi';

declare module '@hapi/hapi' {
  type RequestWithPayload<T> = Omit<Request, 'payload'> & {
    payload: T;
  };
  type RequestWithQuery<T> = Omit<Request, 'query'> & {
    query: T;
  };
}
