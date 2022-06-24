import { rest } from 'msw';
import { setupServer } from 'msw/node';

export const restHandlers = [
  rest.get('https://example.com/check', (request, res, ctx) => {
    console.log('Request' + JSON.stringify(request, null, 2));

    return res(ctx.status(200), ctx.json({ status: 'ok' }));
  }),

  rest.get('http://127.0.0.1*/todo', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ status: 'ok' }));
  }),

  rest.get('http://127.0.0.1*/goodbye', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ status: 'ok' }));
  }),
];

const server = setupServer(...restHandlers);

beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('msw server', () => {
  it('should be defined', () => expect(server).toBeDefined());
});
