import Product from '@modules/products/typeorm/entities/Product';
import ProductRepository from '@modules/products/typeorm/repositories/ProductsRepository';
import { IProductRepository } from '@modules/products/typeorm/repositories/ProductsRepositoryInterface';
import RedisCache from '@shared/cache/RedisCache';

class ListProductService {
  private productsRepository: IProductRepository;

  constructor() {
    this.productsRepository = new ProductRepository();
  }

  public async execute(): Promise<Product[]> {
    let products = await RedisCache.recover<Product[]>(
      'api-vendas-PRODUCT_LIST',
    );

    if (!products) {
      products = await this.productsRepository.findAll();
    }

    await RedisCache.save('api-vendas-PRODUCT_LIST', products);

    return products;
  }
}

export default ListProductService;
