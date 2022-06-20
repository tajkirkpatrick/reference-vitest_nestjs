import { Test, TestingModule } from '@nestjs/testing';
import { vi } from 'vitest';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', async () => {
  const app: TestingModule = await Test.createTestingModule({
    controllers: [AppController],
    providers: [AppService],
  }).compile();

  const appService = app.get<AppService>(AppService);
  const appController = app.get(AppController);

  beforeEach(async () => {
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
  });

  it('should be an instance of TestingModule', () => {
    expect(app).toBeInstanceOf(TestingModule);
  });

  it('should be type of object', () => {
    expect(app).toBeTypeOf('object');
  });

  it('appController should return Hello World', () => {
    vi.spyOn(appController, 'getHello').mockImplementationOnce(() =>
      appService.getHello(),
    );

    expect(appController.getHello()).toBe('Hello World!');
  });
});
