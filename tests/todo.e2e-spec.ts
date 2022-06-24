import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './../src/app.module';
import request = require('supertest');

describe('Todo (e2e)', async () => {
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

  it('app should be defined', () => {
    expect(app).toBeDefined();
  });

  it(`msw - GET /todo`, async () => {
    return await request(app.getHttpServer())
      .get('/todo')
      .expect(200)
      .expect({ status: 'ok' });
  });

  it(`msw - GET /goodbye`, async () => {
    const response: request.Response = await request(app.getHttpServer()).get(
      '/goodbye',
    );

    const responseText = JSON.parse(response.text);

    expect(response.statusCode).toBe(200);
    expect(responseText).toStrictEqual({ status: 'ok' });
  });
});
