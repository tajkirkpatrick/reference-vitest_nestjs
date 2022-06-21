import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';

describe('AppService', async () => {
  const app: TestingModule = await Test.createTestingModule({
    providers: [AppService],
  }).compile();

  const service = app.get<AppService>(AppService);

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return "Hello World"', () => {
    expect(service.getHello()).toBe('Hello World!');
  });

  it('should return "Goodbye World!"', () => {
    expect(service.getGoodbye()).toBe('Goodbye World!');
  });
});
