import { Inject, Injectable } from '@nestjs/common';
import { ProductsService } from '../../products/services/products.service';
import { ConfigType } from '@nestjs/config';
import config from '../../config';

@Injectable()
export class OrderService {
  constructor(private productService: ProductsService, @Inject(config.KEY) private configService: ConfigType<typeof config>) {
  }

  getOrders(userId: string) {
    console.log('KEY IS!!', this.configService.api_key);
    return this.productService.findAll();
  }
}