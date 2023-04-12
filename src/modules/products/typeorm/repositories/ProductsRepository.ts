import { In, Repository } from 'typeorm';
import Product from '@modules/products/typeorm/entities/Product';
import { IFindProducts, IProduct, IProductFullInfo, IProductRequest } from '@modules/products/typeorm/repositories/ProductsRepositoryInterface';
import { dataSource } from '@shared/typeorm';


export default class ProductRepository {
  private ormRepository: Repository<Product>

  constructor() {
    this.ormRepository = dataSource.getRepository(Product);
  }

  public async create({ name, price, quantity }: IProductRequest): Promise<Product> {
    const product = this.ormRepository.create({
      name,
      price,
      quantity,
    });

    await this.ormRepository.save(product);

    return product;
  }

  public async findById(id: string): Promise<Product | null> {
    const product = await this.ormRepository.findOneBy({ id });

    return product;
  }

  public async findByName(name: string): Promise<Product | null> {
    const product = this.ormRepository.findOneBy({ name });

    return product;
  }

  public async findAllByIds(products: IFindProducts[]): Promise<Product[]> {
    const productIds = products.map(product => product.id);

    const existsProducts = await this.ormRepository.find({
      where: {
        id: In(productIds),
      },
    });

    return existsProducts;
  }

  public async findAll(): Promise<Product[]> {
    const products = await this.ormRepository.find();

    return products;
  }

  public async saveProduct(updatedProductQuantity: IProduct[]): Promise<void> {
    await this.ormRepository.save(updatedProductQuantity);
  }

  public async update({ id, name, price, quantity }: IProductFullInfo): Promise<void> {
    await this.ormRepository.update(id, {
      name,
      price,
      quantity,
    });
  }

  public async remove(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}
