import { Test, TestingModule } from '@nestjs/testing';
import { vi } from 'vitest';
import { AppController } from './app.controller';
import { AppService } from './app.service';

const mockAppService = {
  getHello: vi.fn().mockImplementation(() => 'Hello Todd!'),
  getGoodbye: vi.fn(() => 'Goodbye Test Master!'),
};

describe('AppController', async () => {
  const app: TestingModule = await Test.createTestingModule({
    controllers: [AppController],
    providers: [
      {
        provide: AppService,
        useValue: mockAppService,
      },
    ],
  }).compile();

  const controller = app.get<AppController>(AppController);

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return Hello World', () => {
    expect(controller.getHello()).toBe('Hello Todd!');
  });

  it('should return Goodbye World', () => {
    expect(controller.getGoodbye()).toBe('Goodbye Test Master!');
  });
});
