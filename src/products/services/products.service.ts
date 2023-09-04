import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ProductEntity } from '../entities/product.entity';
import { Db } from 'mongodb';

@Injectable()
export class ProductsService {


  constructor(@Inject('DATABASE_CONNECTION') private db: Db) {
  }


  async findAll(): Promise<ProductEntity[]> {
    return this.db.collection<ProductEntity>('products').find().toArray();
  }

  async findOne(id: number): Promise<ProductEntity> {
    console.log('serching', id);
    const found = await this.db.collection<ProductEntity>('products').findOne({ _id: id, id });
    console.log({ found });
    if (!found) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return this.db.collection<ProductEntity>('products').findOne({ _id: id });
  }

  create(payload: ProductEntity): ProductEntity {

    return payload;
  }

  update(id: number, payload: ProductEntity): ProductEntity {

    return payload;
  }

  delete(id: number): ProductEntity {
    return null;
  }

  all(limit = 100, offset = 0): ProductEntity[] {
    return [];
  }

}
