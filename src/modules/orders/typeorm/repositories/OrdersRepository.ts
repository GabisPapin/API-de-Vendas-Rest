import { Repository } from 'typeorm';
import { dataSource } from '@shared/typeorm';
import Order from '@modules/orders/typeorm/entities/Order';
import { IRequest } from '@modules/orders/typeorm/repositories/OrdersRepositoryInterface';


class OrdersRepository {
  private ormRepository: Repository<Order>

  constructor() {
    this.ormRepository = dataSource.getRepository(Order);
  }

  public async findById(id: string): Promise<Order | null> {
    const order = await this.ormRepository
    .createQueryBuilder()
    .relation(Order, 'order_products')
    .relation(Order, 'customer')
    .of(id)
    .loadOne();

    return order;
  }

  public async createOrder({ customer, products }: IRequest): Promise<Order> {
    const order = this.ormRepository.create({
      customer,
      order_products: products,
    });

    await this.ormRepository.save(order);

    return order;
  }
}

export default OrdersRepository;
