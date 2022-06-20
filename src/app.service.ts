import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  goodbye(): string {
    return 'Goodbye World!';
  }
}
