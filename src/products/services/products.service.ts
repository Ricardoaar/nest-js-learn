import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '../entities/product';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { FilterProductDto } from '../dtos/product.dto';

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
    return this.productModel.find(filters).skip(offset).limit(limit).exec();
  }

  async findOne(id: number): Promise<Product> {

    const found = this.productModel.findById(id).exec();
    if (!found) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return found;
  }

  async create(payload: Product): Promise<Product> {
    const createdProduct = await this.productModel.create(payload);
    console.log({ createdProduct });
    return createdProduct;
  }

  async update(id: number, payload: Product): Promise<Product> {
    const updatedProduct = await this.productModel.findByIdAndUpdate(id, { $set: payload }, { new: true }).exec();

    return updatedProduct;
  }

  async delete(id: number): Promise<Product> {

    const deletedProduct = await this.productModel.findByIdAndDelete(id).exec();

    if (!deletedProduct) throw new NotFoundException(`Product #${id} not found`);
    return deletedProduct as Product;
  }

  all(limit = 100, offset = 0): Product[] {
    return [];
  }

}
