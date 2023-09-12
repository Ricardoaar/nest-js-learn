import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { OrderController } from './controllers/order.controller';
import { ProductsModule } from '../products/products.module';
import { OrderService } from './services/order.service';
import { Product } from '../products/entities/product.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';

@Module({
  imports: [ProductsModule, MongooseModule.forFeature([{
    name: User.name,
    schema: UserSchema,
  }])],
  controllers: [UserController, OrderController],
  providers: [UserService, OrderService, Product],
  exports: [UserService],
})

export class UsersModule {
}
