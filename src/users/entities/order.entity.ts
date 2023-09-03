import { UserEntity } from './user.entity';
import { ProductEntity } from '../../products/entities/product.entity';

class OrderEntity {
  id: number;
  name: string;
  user: Required<Pick<UserEntity, 'id'>> & Partial<UserEntity>;
  products: ProductEntity[];
}

