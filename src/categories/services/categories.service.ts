import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class CategoriesService {
  private categories = [];

  constructor() {
    this.categories = Array.from({ length: 10 }, (_, i) => ({
      id: i,
      name: `Category #${i}`,
      image: `http://placehold.it/200x200?text=Category #${i}`,
      description: `Description #${i}`,
    }));
  }

  getAll({ limit = 10, offset = 0 }) {

    return this.categories.slice(offset, offset + limit);
  }

  findOne(id: number) {
    return this.categories.find(item => item.id === id);
  }

  create(payload) {
    const newCategory = {
      id: this.categories.length + 1,
      ...payload,
    };

    this.categories.push(newCategory);

    return newCategory;
  }

  update(id: number, payload) {
    const index = this.categories.findIndex(item => item.id === id);

    if (index === -1) {
      throw new NotFoundException('Category not found');
    }

    this.categories[index] = {
      ...this.categories[index],
      ...payload,
    };

    return this.categories[index];
  }

  delete(id: number) {
    const index = this.categories.findIndex(item => item.id === id);

    if (index === -1) {
      throw new Error('Category not found');
    }

    this.categories.splice(index, 1);

    return true;
  }

}
