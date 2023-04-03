import { getCustomRepository } from 'typeorm';
import Product from '@modules/products/typeorm/entities/Product';
import ProductRepository from '@modules/products/typeorm/repositories/ProductsRepository';
import RedisCache from '@shared/cache/RedisCache';

class ListProductService {
  public async execute(): Promise<Product[]> {
    const productsRepository = getCustomRepository(ProductRepository);

    let products = await RedisCache.recover<Product[]>(
      'api-vendas-PRODUCT_LIST',
    );

    if (!products) {
      products = await productsRepository.find();
    }

    await RedisCache.save('api-vendas-PRODUCT_LIST', products);

    return products;
  }
}

export default ListProductService;
