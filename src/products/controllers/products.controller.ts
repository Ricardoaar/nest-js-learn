import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import { Product } from '../entities/product.entity';
import { CreateProductDto, FilterProductDto, UpdateProductDto } from '../dtos/product.dto';
import { MongoIdPipe } from '../../common/mongo-id/mongo-id.pipe';

interface PaginateQuery {
  limit?: number;
  offset?: number;
}

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {

  }

  @Get()
  async getProducts(@Query() params: FilterProductDto): Promise<Product[]> {

    return this.productsService.findAll(params);
  }

  @Get('/:id')
  @HttpCode(HttpStatus.ACCEPTED)
  async getProduct(@Param('id') id: number): Promise<Product> {
    return await this.productsService.findOne(id);
  }

  @Post('/')
  async createProduct(@Body() payload: CreateProductDto): Promise<object> {
    const created = await this.productsService.create(payload);
    return {
      message: 'ProductEntity created',
      created,
    };
  }

  @Put('/:id')
  async updateProduct(@Body() payload: UpdateProductDto, @Param('id') id: number): Promise<object> {
    const updatedProduct = await this.productsService.update(id, payload);
    return {
      message: 'ProductEntity updated',
      updatedProduct,
    };
  }

  @Patch('/:id')
  partialUpdateProduct(@Body() payload: object, @Param('id') id: number): object {
    return {
      partialUpdatedProduct: id,
    };
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.ACCEPTED)
  async deleteProduct(@Param('id', MongoIdPipe) id: number): Promise<object> {
    const deletedProduct = await this.productsService.delete(id);

    return {
      message: `ProductEntity #${id} deleted`,
      deletedProduct,
    };
  }

}
