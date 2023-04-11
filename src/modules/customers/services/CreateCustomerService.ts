import AppError from '@shared/errors/AppError';
import Customer from '@modules/customers/typeorm/entities/Customer';
import CustomersRepository from '@modules/customers/typeorm/repositories/CustomersRepository';
import { ICustomersRepository, ICreate } from '@modules/customers/typeorm/repositories/CustomersRepositoryInterface';

class CreateCustomerService {
  private customersRepository: ICustomersRepository;
  constructor() {
    this.customersRepository = new CustomersRepository();
  }

  public async execute({ name, email }: ICreate): Promise<Customer> {
    const emailExists = await this.customersRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('Email address already exists');
    }

    const customer = await this.customersRepository.create({
      name,
      email,
    });

    return customer;
  }
}

export default CreateCustomerService;
