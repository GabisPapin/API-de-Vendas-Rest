import { Repository } from 'typeorm';
import { dataSource } from '@shared/typeorm';
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
class CustomersRepository {
  private ormRepository: Repository<Customer>

  constructor() {
    this.ormRepository = dataSource.getRepository(Customer);
  }
  public async findByName(name: string): Promise<Customer | null> {
    const customer = await this.ormRepository.findOneBy({ name });

    return customer;
  }

  public async findById(id: string): Promise<Customer | null> {
    const customer = await this.ormRepository.findOneBy({ id });

    return customer;
  }

  public async findByEmail(email: string): Promise<Customer | null> {
    const customer = await this.ormRepository.findOneBy({ email });

    return customer;
  }

  public async findAll({ page, skip, take }: SearchParams): Promise<ICustomerPaginate>{
    const [customers, count] = await this.ormRepository.createQueryBuilder().skip(skip).take(take).getManyAndCount();

    const result = {
      per_page: take,
      total: count,
      current_page: page,
      data: customers,
    };

    return result;
  }
}

export default CustomersRepository;
