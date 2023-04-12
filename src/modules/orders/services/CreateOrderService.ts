import CustomersRepository from '@modules/customers/typeorm/repositories/CustomersRepository';
import ProductsRepository from '@modules/products/typeorm/repositories/ProductsRepository';
import OrdersRepository from '../typeorm/repositories/OrdersRepository';
import { ICustomersRepository } from '@modules/customers/typeorm/repositories/CustomersRepositoryInterface';
import { IOrdersRepository } from '@modules/orders/typeorm/repositories/OrdersRepositoryInterface';
import { IProductRepository, IRequest } from '@modules/products/typeorm/repositories/ProductsRepositoryInterface';
import AppError from '@shared/errors/AppError';
import Order from '../typeorm/entities/Order';


class CreateOrderService {
  private ordersRepository: IOrdersRepository;
  private customerRepository: ICustomersRepository;
  private productRepository: IProductRepository;

  constructor() {
    this.ordersRepository = new OrdersRepository();
    this.customerRepository = new CustomersRepository();
    this.productRepository = new ProductsRepository();
  }

  public async execute({ customer_id, products }: IRequest): Promise<Order> {
    const customerExists = await this.customerRepository.findById(customer_id);

    if (!customerExists) {
      throw new AppError('Could not find any customer with the given id.');
    }

    const existsProducts = await this.productRepository.findAllByIds(products);

    if (!existsProducts.length) {
      throw new AppError('Could not find any products with the given ids.');
    }

    const existsProductsIds = existsProducts.map(product => product.id);

    const checkInexistentProducts = products.filter(
      product => !existsProductsIds.includes(product.id),
    );

    if (checkInexistentProducts.length) {
      throw new AppError(
        `Could not find product ${checkInexistentProducts[0].id}.`,
      );
    }

    const quantityAvailable = products.filter(
      product =>
        existsProducts.filter(p => p.id === product.id)[0].quantity <
        product.quantity,
    );

    if (quantityAvailable.length) {
      throw new AppError(
        `The quantity ${quantityAvailable[0].quantity}
         is not available for ${quantityAvailable[0].id}.`,
      );
    }

    const serializedProducts = products.map(product => ({
      product_id: product.id,
      quantity: product.quantity,
      price: existsProducts.filter(p => p.id === product.id)[0].price,
    }));

    const order = await this.ordersRepository.createOrder({
      customer: customerExists,
      products: serializedProducts,
    });

    const { order_products } = order;

    const updatedProductQuantity = order_products.map(product => ({
      id: product.product_id,
      quantity:
        existsProducts.filter(p => p.id === product.product_id)[0].quantity -
        product.quantity,
    }));
    await this.productRepository.saveProduct(updatedProductQuantity);

    return order;
  }
}

export default CreateOrderService;
