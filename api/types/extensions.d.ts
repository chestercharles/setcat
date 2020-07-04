import '@hapi/hapi';

declare module '@hapi/hapi' {
  type RequestWithPayload<T> = Omit<Request, 'payload'> & {
    payload: T;
  };
  type RequestWithParams<T> = Omit<Request, 'params'> & {
    params: T;
  };
}
