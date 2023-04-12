import { IOrdersRepository } from '@modules/orders/typeorm/repositories/OrdersRepositoryInterface';
import AppError from '@shared/errors/AppError';
import Order from '../typeorm/entities/Order';
import OrdersRepository from '../typeorm/repositories/OrdersRepository';

interface IRequest {
  id: string;
}

class ShowOrderService {
  private ordersRepository: IOrdersRepository;

  constructor() {
    this.ordersRepository = new OrdersRepository();
  }

  public async execute({ id }: IRequest): Promise<Order> {
    const order = await this.ordersRepository.findById(id);

    if (!order) {
      throw new AppError('Order not found.');
    }

    return order;
  }
}

export default ShowOrderService;
