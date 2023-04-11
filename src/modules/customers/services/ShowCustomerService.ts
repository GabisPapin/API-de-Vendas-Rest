import AppError from '@shared/errors/AppError';
import Customer from '@modules/customers/typeorm/entities/Customer';
import CustomersRepository from '@modules/customers/typeorm/repositories/CustomersRepository';
import { ICustomersRepository } from '@modules/customers/typeorm/repositories/CustomersRepositoryInterface';

interface IRequest {
  id: string;
}

class ShowCustomerService {
  private customersRepository: ICustomersRepository;
  constructor() {
    this.customersRepository = new CustomersRepository();
  }

  public async execute({ id }: IRequest): Promise<Customer> {
    const customer = await this.customersRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found.');
    }

    return customer;
  }
}

export default ShowCustomerService;
