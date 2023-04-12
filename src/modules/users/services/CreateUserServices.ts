import User from '@modules/users/typeorm/entities/User';
import { ICreate, IUserRepository } from '@modules/users/typeorm/repositories/UserRepositoryInterface';
import UserRepository from '@modules/users/typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';

class CreateUserService {
  private userRepository: IUserRepository;
  constructor() {
    this.userRepository = new UserRepository();
  }

  public async execute({ name, email, password }: ICreate): Promise<User> {
    const emailExists = await this.userRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('Email address already exists');
    }

    const user = await this.userRepository.create({ name, email, password })

    return user;
  }
}

export default CreateUserService;
