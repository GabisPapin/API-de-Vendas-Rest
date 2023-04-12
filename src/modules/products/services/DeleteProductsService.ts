import RedisCache from '@shared/cache/RedisCache';
import AppError from '@shared/errors/AppError';
import ProductRepository from '@modules/products/typeorm/repositories/ProductsRepository';
import { IProductRepository } from '@modules/products/typeorm/repositories/ProductsRepositoryInterface';

interface IRequest {
  id: string;
}

class DeleteProductService {
  private productsRepository: IProductRepository;

  constructor() {
    this.productsRepository = new ProductRepository();
  }

  public async execute({ id }: IRequest): Promise<void> {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new AppError('Product not found.');
    }

    await RedisCache.invalidate('api-vendas-PRODUCT_LIST');

    await this.productsRepository.remove(product.id);
  }
}

export default DeleteProductService;
