import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './../src/app.module';
import request = require('supertest');

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

  it('should be defined', () => {
    expect(app).toBeDefined();
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
});
