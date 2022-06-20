import { Test, TestingModule } from '@nestjs/testing';
import { vi } from 'vitest';
import { AppController } from './app.controller';
import { AppService } from './app.service';

const mockAppService = {
  getHello: vi.fn(() => 'Hello Todd!'),
  goodbye: vi.fn(() => 'Goodbye Test Master!'),
};

describe('AppController', async () => {
  const app: TestingModule = await Test.createTestingModule({
    controllers: [AppController],
    providers: [AppService],
  })
    .overrideProvider(AppService)
    .useValue(mockAppService)
    .compile();

  const appService = app.get<AppService>(AppService);
  const appController = app.get<AppController>(AppController);

  beforeEach(async () => {
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
  });

  it('should return Hello World', () => {
    vi.spyOn(appController, 'getHello').mockImplementationOnce(() =>
      appService.getHello(),
    );

    expect(appController.getHello()).toBe('Hello World!');
  });

  it('should return Goodbye World', () => {
    vi.spyOn(appController, 'getGoodbye').mockImplementation(() =>
      appService.goodbye(),
    );
    expect(appController.getGoodbye()).toBe('Goodbye World!');
  });
});
