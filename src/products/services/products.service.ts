import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '../entities/product.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateProductDto, FilterProductDto, UpdateProductDto } from '../dtos/product.dto';
import { Category } from '../../categories/entities/category.entity';

@Injectable()
export class ProductsService {


  constructor(@InjectModel(Product.name) private productModel: Model<Product>) {
  }




  async findAll(params?: FilterProductDto): Promise<Product[]> {
    const { limit = 30, offset = 0, minPrice, maxPrice } = params || {};
    const filters: any = {};
    if (minPrice && maxPrice) {
      filters.price = { $gte: minPrice, $lte: maxPrice };
    }
    return this.productModel.find(filters).skip(offset).populate('category').limit(limit).exec();
  }

  async findOne(id: number): Promise<Product> {

    const found = this.productModel.findById(id).populate('category').exec();
    if (!found) {
      throw new NotFoundException(`Product #${id} not found`);
    }

    return found;
  }

  async create(payload: CreateProductDto): Promise<Product> {
    const createdProduct = await this.productModel.create(payload);
    console.log({ createdProduct });
    return createdProduct;
  }

  async update(id: number, payload: UpdateProductDto): Promise<Product> {
    const updatedProduct = await this.productModel.findByIdAndUpdate(id, { $set: payload }, { new: true }).exec();

    return updatedProduct;
  }

  async delete(id: number): Promise<Product> {

    const deletedProduct = await this.productModel.findByIdAndDelete(id).exec();

    if (!deletedProduct) throw new NotFoundException(`Product #${id} not found`);
    return deletedProduct as Product;
  }


}
