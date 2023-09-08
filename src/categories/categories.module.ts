import { Module } from '@nestjs/common';
import { CategoriesController } from './controllers/categories.controller';
import { CategoriesService } from './services/categories.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from './entities/category.entity';
import { Product } from '../products/entities/product.entity';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: Category.name,
      schema: CategorySchema,
    },
  ]), Product],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})

export class CategoriesModule {
}