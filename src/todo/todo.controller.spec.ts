import { Test, TestingModule } from '@nestjs/testing';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

const mockTodoService = {
  findAll: vi.fn(() => {
    return ['todos'];
  }),
  findOne: vi.fn(() => {
    return 'todo';
  }),
};

describe('TodoController', () => {
  let controller: TodoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [
        {
          provide: TodoService,
          useValue: mockTodoService,
        },
      ],
    }).compile();

    controller = module.get<TodoController>(TodoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('retrieving todo(s)', () => {
    it('should return all todos', () => {
      expect(controller.findAll()).toStrictEqual(['todos']);
    });
    it('should return one todo', () => {
      expect(controller.findOne()).toBe('todo');
    });
  });
});
