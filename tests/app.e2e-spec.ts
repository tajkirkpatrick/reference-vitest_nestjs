import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './../src/app.module';

import { rest } from 'msw';
import { setupServer } from 'msw/node';

describe('MSW Setup (e2e)', () => {
  const restHandlers = [
    rest.get('/health/check', (req, res, ctx) => {
      return res(ctx.status(200), ctx.json({ status: 'ok' }));
    }),
  ];
  const server = setupServer(...restHandlers);

  //   Nest JS stuff

  beforeAll(async () => {
    server.listen({ onUnhandledRequest: 'error' });
  });

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  it('msw is initialized', () => {
    expect(server).toBeDefined();
  });
});

describe('App (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('app is initialized', () => {
    expect(app).toBeDefined();
  });
});
