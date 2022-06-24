import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './../src/app.module';

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

  it('nestjs - app is initialized', () => {
    expect(app).toBeDefined();
  });

  it('msw - fetch check endpoint', async () => {
    const response: Response = await fetch('https://example.com/check');

    expect(response.status).toBe(200);
  });
});
