import { getCustomRepository } from 'typeorm';
import Customer from '@modules/customers/typeorm/entities/Customer';
import CustomersRepository from '@modules/customers/typeorm/repositories/CustomersRepository';

interface IPaginate {
  from: number;
  to: number;
  per_page: number;
  total: number;
  current_page: number;
  prev_page: number | null;
  next_page: number | null;
  data: Customer[];
}

class ListCustomerService {
  public async execute(): Promise<IPaginate> {
    const customersRepository = getCustomRepository(CustomersRepository);

    const customers = await customersRepository.createQueryBuilder().paginate();

    return customers as IPaginate;
  }
}

export default ListCustomerService;
