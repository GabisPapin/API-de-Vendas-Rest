import Customer from '@modules/customers/typeorm/entities/Customer';
import { ICustomerPaginate, SearchParams } from '@modules/customers/typeorm/repositories/CustomersRepository';

export interface ICustomersRepository {
  findByName(name: string): Promise<Customer | null>;
  findById(id: string): Promise<Customer | null>;
  findByEmail(email: string): Promise<Customer | null>;
  findAll({ page, skip, take }: SearchParams): Promise<ICustomerPaginate>;
}
