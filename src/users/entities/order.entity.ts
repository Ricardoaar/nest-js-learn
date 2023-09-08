import { UserEntity } from './user.entity';
import { Product } from '../../products/entities/product.entity';

class OrderEntity {
  id: number;
  name: string;
  user: Required<Pick<UserEntity, 'id'>> & Partial<UserEntity>;
  products: Product[];
}

