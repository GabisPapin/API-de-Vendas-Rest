import AppError from '@shared/errors/AppError';
import CustomersRepository from '@modules/customers/typeorm/repositories/CustomersRepository';
import { ICustomersRepository, IUpdate } from '@modules/customers/typeorm/repositories/CustomersRepositoryInterface';

class UpdateCustomerService {
  private customersRepository: ICustomersRepository;
  constructor() {
    this.customersRepository = new CustomersRepository();
  }

  public async execute({ id, name, email }: IUpdate): Promise<void> {
    const customer = await this.customersRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found.');
    }

    const customerExists = await this.customersRepository.findByEmail(email);

    if (customerExists && email !== customer.email) {
      throw new AppError('There already have one customer with this email.');
    }

    await this.customersRepository.update({ id, name, email });
  }
}

export default UpdateCustomerService;
