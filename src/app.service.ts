import { Inject, Injectable } from '@nestjs/common';
import config from './config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class AppService {

  constructor(@Inject(config.KEY) private generalConfig: ConfigType<typeof config>) {
  }

  getHello(message: string = 'Hello World!'): string {
    return `${message} the g1uard is ${this.generalConfig.api_key}`;
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
