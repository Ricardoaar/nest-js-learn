import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  constructor(@Inject('API_KEY') private apiKey: string) {
  }

  getHello(message: string = 'Hello World!'): string {
    return `${message} the guard is ${this.apiKey}`;
  }

  postHello(): string {
    return 'Hello World!';
  }

  getDevices(limit: number = 100, offset: number = 0): string[] {
    const mockDevices = Array.from({ length: 100 }, (_, i) => `Device ${i}`);
    const start = +offset;
    const end = +limit + +offset;

    return mockDevices.slice(start, end);
  }

}
