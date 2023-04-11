import AppError from '@shared/errors/AppError';
import CustomersRepository from '@modules/customers/typeorm/repositories/CustomersRepository';
import { ICustomersRepository, IDelete } from '@modules/customers/typeorm/repositories/CustomersRepositoryInterface';

class DeleteCustomerService {
  private customersRepository: ICustomersRepository;
  constructor() {
    this.customersRepository = new CustomersRepository();
  }

  public async execute({ id }: IDelete): Promise<void> {
    const customer = await this.customersRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found.');
    }

    await this.customersRepository.remove(customer);
  }
}

export default DeleteCustomerService;
