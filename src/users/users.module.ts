import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { OrderController } from './controllers/order.controller';
import { ProductsModule } from '../products/products.module';
import { OrderService } from './services/order.service';
import { Product } from '../products/entities/product';

@Module({
  imports: [ProductsModule],
  controllers: [UserController, OrderController],
  providers: [UserService, OrderService, Product],
})

export class UsersModule {
}
