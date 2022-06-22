import { Test, TestingModule } from '@nestjs/testing';
import { TodoService } from './todo.service';

describe('TodoService', () => {
  let service: TodoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodoService],
    }).compile();

    service = module.get<TodoService>(TodoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('retrieving todo(s)', () => {
    it('should retrieve all todos', () => {
      expect(service.findAll()).toStrictEqual(['todos']);
    });

    it('should get one todo', () => {
      expect(service.findOne()).toBe('todo');
    });
  });
});
