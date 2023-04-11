import Customer from '@modules/customers/typeorm/entities/Customer';

export interface ICustomerPaginate {
  per_page: number;
  total: number;
  current_page: number;
  data: Customer[];
}
export interface SearchParams {
  page: number;
  skip: number;
  take: number;
}

export interface ICreate {
  name: string;
  email: string;
}

export interface IDelete {
  id: string;
}

export interface IUpdate {
  id: string;
  name: string;
  email: string;
}
export interface ICustomersRepository {
  create({ name, email }: ICreate): Promise<Customer>;
  findByName(name: string): Promise<Customer | null>;
  findById(id: string): Promise<Customer | null>;
  findByEmail(email: string): Promise<Customer | null>;
  findAll({ page, skip, take }: SearchParams): Promise<ICustomerPaginate>;
  update({ id, name, email }: IUpdate): Promise<void>;
  remove({ id }: IDelete): Promise<void>;
}
