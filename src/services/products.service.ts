import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductEntity } from '../entities/product.entity';

@Injectable()
export class ProductsService {

  private products: ProductEntity[] = [];

  private getProducts(): ProductEntity[] {
    return Array.from({ length: 100 }, (_, i) => {
      return {
        id: i,
        name: `Product ${i}`,
        price: Math.floor(Math.random() * 1000),
      };
    });
  }

  constructor() {
    this.products = this.getProducts();
  }


  findAll(): ProductEntity[] {
    return this.products;
  }

  findOne(id: number): ProductEntity {

    const product = this.products.find(item => {
      return item.id === id;
    });

    if (!product) throw new NotFoundException('Product not found');


    return product;
  }

  create(payload: ProductEntity): ProductEntity {
    const newProduct = {
      id: this.products.length + 1,
      ...payload,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  update(id: number, payload: ProductEntity): ProductEntity {
    this.products[id] = {
      ...payload,
      id,
    };
    return this.products[id];
  }

  delete(id: number): ProductEntity {
    const product = this.products[id];
    this.products = this.products.filter(item => item.id !== id);
    return product;
  }

  all(limit = 100, offset = 0): ProductEntity[] {
    return this.products.slice(offset, offset + limit);
  }

}
