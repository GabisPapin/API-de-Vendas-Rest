import User from '@modules/users/typeorm/entities/User';
import { IUserRepository } from '@modules/users/typeorm/repositories/UserRepositoryInterface';
import UserRepository from '@modules/users/typeorm/repositories/UsersRepository';

class ListUserService {
  private userRepository: IUserRepository;
  constructor() {
    this.userRepository = new UserRepository();
  }

  public async execute(): Promise<User[]> {
    const user = await this.userRepository.findAll();

    return user;
  }
}

export default ListUserService;
