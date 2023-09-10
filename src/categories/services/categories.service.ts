import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from '../entities/category.entity';
import { Model } from 'mongoose';
import { CategoryDto } from '../dtos/Category.dto';
import { ObjectId } from 'mongodb';

@Injectable()
export class CategoriesService {
  constructor(@InjectModel(Category.name) private categories: Model<Category>) {
  }

  async addProduct(id: number, productId: ObjectId) {
    const category = await this.categories.findById(id);
    category.products.pull(productId);
    return await category.save();
  }

  async removeProduct(id: number, productId: ObjectId) {
    const category = await this.categories.findById(id);
    category.products.pull(productId);
    return await category.save();
  }


  async findAll({ limit = 1000, offset = 0 } = {}) {
    return await this.categories.find().skip(offset).limit(limit).populate('products').exec();
  }

  async findOne(id: number) {
    const category = await this.categories.findById(id).exec();

    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }


    return category;
  }

  async create(payload: CategoryDto) {
    return await this.categories.create(payload);
  }

  async update(id: number, payload) {
    const category = await this.categories.findByIdAndUpdate(id, { $set: payload }, { new: true }).exec();

    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }

    return category;
  }

  async delete(id: number) {
    const category = await this.categories.findByIdAndDelete(id).exec();

    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    return category;
  }
}
