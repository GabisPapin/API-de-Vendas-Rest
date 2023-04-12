import RedisCache from '@shared/cache/RedisCache';
import AppError from '@shared/errors/AppError';
import Product from '@modules/products/typeorm/entities/Product';
import ProductRepository from '@modules/products/typeorm/repositories/ProductsRepository';
import { IProductFullInfo, IProductRepository } from '@modules/products/typeorm/repositories/ProductsRepositoryInterface';


class UpdateProductService {
  private productsRepository: IProductRepository;

  constructor() {
    this.productsRepository = new ProductRepository();
  }

  public async execute({
    id,
    name,
    price,
    quantity,
  }: IProductFullInfo): Promise<void> {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new AppError('Product not found.');
    }

    const productExists = await this.productsRepository.findByName(name);

    if (productExists && name === product.name) {
      throw new AppError('There is already one product with this name');
    }

    await RedisCache.invalidate('api-vendas-PRODUCT_LIST');

    await this.productsRepository.update({ id, name, price, quantity });
  }
}

export default UpdateProductService;
