import { ICustomerPaginate, ICustomersRepository } from '@modules/customers/typeorm/repositories/CustomersRepositoryInterface';
import CustomersRepository from '@modules/customers/typeorm/repositories/CustomersRepository';

interface ISearchParams {
  page: number;
  limit: number;
}
class ListCustomerService {
  private customersRepository: ICustomersRepository;
  constructor() {
    this.customersRepository = new CustomersRepository();
  }

  public async execute({ limit, page }: ISearchParams): Promise<ICustomerPaginate> {
    const take = limit;
    const skip = (Number(page) - 1) * take;

    const customers = await this.customersRepository.findAll({
      page,
      skip,
      take,
    });

    return customers;
  }
}

export default ListCustomerService;
