import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';

interface GetDevicesParams {
  limit: number;
  offset: number;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {

  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('another-hello')
  getAnotherHello(): string {
    return this.appService.getHello('This is another hello!!!');
  }

  @Get('devices')
  getDevices(@Query() params: GetDevicesParams): string[] {
    const { limit, offset } = params;
    const devices = this.appService.getDevices(limit, offset);
    return devices;
  }

}
