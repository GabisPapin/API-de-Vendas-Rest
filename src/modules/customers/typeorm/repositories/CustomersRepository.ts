import { Repository } from 'typeorm';
import { dataSource } from '@shared/typeorm';
import Customer from '@modules/customers/typeorm/entities/Customer';
import { ICustomerPaginate, ICreate, SearchParams, IDelete, IUpdate } from '@modules/customers/typeorm/repositories/CustomersRepositoryInterface';

class CustomersRepository {
  private ormRepository: Repository<Customer>

  constructor() {
    this.ormRepository = dataSource.getRepository(Customer);
  }

  public async create({ name, email }: ICreate): Promise<Customer> {
    const customer = this.ormRepository.create({
      name,
      email,
    });

    await this.ormRepository.save(customer);

    return customer;
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

  public async update({ id, name, email }: IUpdate): Promise<void> {
    await this.ormRepository.update(id, { name, email });
  }

  public async remove({ id }: IDelete): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default CustomersRepository;
