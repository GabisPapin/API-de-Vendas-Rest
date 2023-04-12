import { IUpdateUser, IUserRepository } from '@modules/users/typeorm/repositories/UserRepositoryInterface';
import UserRepository from '@modules/users/typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';

class UpdateUserService {
  private userRepository: IUserRepository;
  constructor() {
    this.userRepository = new UserRepository();
  }

  public async execute({ id, name, email, password }: IUpdateUser): Promise<void> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new AppError('User not found.');
    }

    await this.userRepository.updateUser({ id, name, email, password });
  }
}

export default UpdateUserService;
