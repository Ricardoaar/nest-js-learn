import { Controller, Get, Param, Post, Query, SetMetadata, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiKeyGuard } from './auth/guards/api-key.guard';
import { isPublic } from './decorators/decorators.decorator';

interface GetDevicesParams {
  limit: number;
  offset: number;
}

@UseGuards(ApiKeyGuard)
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
  @isPublic()
  getDevices(@Query() params: GetDevicesParams): string[] {
    const { limit, offset } = params;
    const devices = this.appService.getDevices(limit, offset);
    return devices;
  }

}
