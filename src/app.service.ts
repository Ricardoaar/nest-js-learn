import { Injectable } from '@nestjs/common';
import { of } from 'rxjs';

@Injectable()
export class AppService {
  getHello(message: string = 'Hello World!'): string {
    return message;
  }

  postHello(): string {
    return 'Hello World!';
  }

  getDevices(limit: number = 100, offset: number = 0): string[] {
    const mockDevices = Array.from({ length: 100 }, (_, i) => `Device ${i}`);
    const start = +offset;
    const end = +limit + +offset;
    console.log({ start, end });
    console.log({ startValue: mockDevices[start], endValue: mockDevices[end] });
    return mockDevices.slice(start, end);
  }

}
