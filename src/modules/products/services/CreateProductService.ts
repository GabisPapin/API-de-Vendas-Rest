import RedisCache from '@shared/cache/RedisCache';
import AppError from '@shared/errors/AppError';
import Product from '@modules/products/typeorm/entities/Product';
import ProductRepository from '@modules/products/typeorm/repositories/ProductsRepository';
import { IProductRepository, IProductRequest } from '@modules/products/typeorm/repositories/ProductsRepositoryInterface';

class CreateProductService {
  private productsRepository: IProductRepository;

  constructor() {
    this.productsRepository = new ProductRepository();
  }

  public async execute({ name, price, quantity }: IProductRequest): Promise<Product> {
    const productExists = await this.productsRepository.findByName(name);

    if (productExists) {
      throw new AppError('There is already one product with this name');
    }

    const product = this.productsRepository.create({
      name,
      price,
      quantity,
    });

    await RedisCache.invalidate('api-vendas-PRODUCT_LIST');

    return product;
  }
}

export default CreateProductService;
