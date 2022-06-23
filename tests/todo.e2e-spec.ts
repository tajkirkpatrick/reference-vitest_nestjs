import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './../src/app.module';
import request = require('supertest');

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

describe('App-e2e-test', async () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('predefined server and app', () => {
    it('should be defined', () => {
      expect(app).toBeDefined();
    });
  });

  it(`GET /`, async () => {
    return await request(app.getHttpServer()).get('/todo').expect(200);
  });

  it(`GET /goodbye`, async () => {
    const response: request.Response = await request(app.getHttpServer()).get(
      '/goodbye',
    );

    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('Goodbye World!');
  });

  it('should hit the msw endpoint', async () => {
    const response: request.Response = await request(app.getHttpServer()).get(
      '/health/check',
    );

    console.log(response);

    expect(response.statusCode).toBe(200);
  });
});
