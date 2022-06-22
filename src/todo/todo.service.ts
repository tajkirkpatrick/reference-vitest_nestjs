import { Injectable } from '@nestjs/common';

@Injectable()
export class TodoService {
  findAll(): string[] {
    return ['todos'];
  }

  findOne(): string {
    return 'todo';
  }
}
