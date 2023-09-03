import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { OrderController } from './controllers/order.controller';
import { ProductsModule } from '../products/products.module';
import { OrderService } from './services/order.service';

@Module({
  imports: [ProductsModule],
  controllers: [UserController, OrderController],
  providers: [UserService, OrderService],
})

export class UsersModule {
}
