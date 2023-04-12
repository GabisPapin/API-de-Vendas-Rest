import AppError from '@shared/errors/AppError';
import UserRepository from '@modules/users/typeorm/repositories/UsersRepository';
import { IAvatar, IUserRepository } from '@modules/users/typeorm/repositories/UserRepositoryInterface';

class UpdateUserAvatarService {
  private userRepository: IUserRepository;
  constructor() {
    this.userRepository = new UserRepository();
  }

  public async execute({ user_id, avatarFilename }: IAvatar): Promise<void> {
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found.');
    }

    await this.userRepository.updateAvatar({ user_id, avatarFilename });
  }
}

export default UpdateUserAvatarService;
