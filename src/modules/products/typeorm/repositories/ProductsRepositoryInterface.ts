import Product from '@modules/products/typeorm/entities/Product';

export interface IFindProducts {
  id: string;
}

export interface IProductRequest {
  name: string;
  price: number;
  quantity: number;
}

export interface IProduct {
  id: string;
  quantity: number;
}

export interface IRequest {
  customer_id: string;
  products: IProduct[];
}

export interface IProductFullInfo {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface IProductRepository {
  create({ name, price, quantity }: IProductRequest): Promise<Product>;
  findById(id: string): Promise<Product | null>;
  findByName(name: string): Promise<Product | null>;
  findAllByIds(products: IFindProducts[]): Promise<Product[]>;
  findAll(): Promise<Product[]>;
  saveProduct(updatedProductQuantity: IProduct[]): Promise<void>;
  update({ id, name, price, quantity }: IProductFullInfo): Promise<void>;
  remove(id: string): Promise<void>;
}
