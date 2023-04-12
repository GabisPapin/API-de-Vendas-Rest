import Customer from '@modules/customers/typeorm/entities/Customer';
import Order from '@modules/orders/typeorm/entities/Order';

export interface IProduct {
  product_id: string;
  price: number;
  quantity: number;
}

export interface IRequest {
  customer: Customer;
  products: IProduct[];
}

export interface IOrdersRepository {
  findById(id: string): Promise<Order | null>;
  createOrder({ customer, products }: IRequest): Promise<Order>;
}
