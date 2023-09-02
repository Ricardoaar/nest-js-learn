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
  Res,
  DefaultValuePipe,
} from '@nestjs/common';
import { raw, Response } from 'express';
import { ProductsService } from '../services/products.service';
import { AppService } from '../app.service';
import { ProductEntity } from '../entities/product.entity';
import { serializeQuery } from '../entities/product.serialize';
import { ParseIntPipe } from '../common/parse-int/parse-int.pipe';
import { CreateProductDto, UpdateProductDto } from '../dtos/product.dtos';

interface PaginateQuery {
  limit?: number;
  offset?: number;
}

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {

  }

  @Get()
  getProducts(
    @Query('limit', new DefaultValuePipe(100), ParseIntPipe) limit: number,
    @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number):
    ProductEntity[] {

    return this.productsService.all(limit, offset);
  }

  @Get('/:id')
  @HttpCode(HttpStatus.ACCEPTED)
  getProduct(@Param('id', ParseIntPipe, ParseIntPipe) id: number): ProductEntity {
    return this.productsService.findOne(id);
  }

  @Post('/')
  createProduct(@Body() payload: CreateProductDto): object {
    console.log({ payload });
    return { message: 'Create a product' };
  }

  @Put('/:id')
  updateProduct(@Body() payload: UpdateProductDto, @Param('id') id: number): object {
    return {
      ...payload,
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
  deleteProduct(@Res() rawResponse: Response, @Param('id') id: number): object {
    // return rawResponse.status(HttpStatus.NOT_FOUND).send();
    if (id >= 10) {
      rawResponse.status(HttpStatus.NOT_FOUND).send();
      return {
        error: 'Product not found',
      };
    }

    rawResponse.status(HttpStatus.ACCEPTED).send({
      deletedProduct: id,
    });

  }

}
