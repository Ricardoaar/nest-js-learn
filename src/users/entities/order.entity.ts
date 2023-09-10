import { User } from './user.entity';
import { Product } from '../../products/entities/product.entity';

class OrderEntity {
  id: number;
  name: string;

  products: Product[];
}

