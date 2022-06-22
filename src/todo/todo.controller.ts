import { Controller, Get, Inject } from '@nestjs/common';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(@Inject(TodoService) private readonly todoService: TodoService) {}

  @Get()
  findAll(): string[] {
    return this.todoService.findAll();
  }

  @Get()
  findOne(): string {
    return this.todoService.findOne();
  }
}
