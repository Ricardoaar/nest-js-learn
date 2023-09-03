import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { OrderService } from '../services/order.service';

@Controller('users/:id/orders')
export class OrderController {

  constructor(private readonly orderService: OrderService) {
  }

  @Get()
  @HttpCode(HttpStatus.ACCEPTED)
  getOrders(@Param('id') id: string) {
    return {
      message: `User #${id} orders`,
      orders: this.orderService.getOrders(id),
    };
  }
}
