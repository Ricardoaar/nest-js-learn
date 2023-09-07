import { Inject, Injectable } from '@nestjs/common';
import { ProductsService } from '../../products/services/products.service';
import { ConfigType } from '@nestjs/config';
import config from '../../config';

@Injectable()
export class OrderService {
  constructor(private productService: ProductsService, @Inject(config.KEY) private configService: ConfigType<typeof config>) {
  }

  getOrders(userId: string) {
    return this.productService.findAll();
  }
}