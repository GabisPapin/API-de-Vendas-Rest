import UserRepository from '@modules/users/typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';
import { compare } from 'bcryptjs';
import { IUpdateProfile, IUserRepository } from '@modules/users/typeorm/repositories/UserRepositoryInterface';

class UpdateProfileService {
  private userRepository: IUserRepository;
  constructor() {
    this.userRepository = new UserRepository();
  }

  public async execute({
    user_id,
    name,
    email,
    password,
    old_password,
  }: IUpdateProfile): Promise<void> {
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found.');
    }

    const userUpdateEmail = await this.userRepository.findByEmail(email);

    if (userUpdateEmail && userUpdateEmail.id !== user_id) {
      throw new AppError('There already have one user with this email.');
    }

    if (password && !old_password) {
      throw new AppError('Old password is required.');
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) {
        throw new AppError('Old password does not match.');
      }

      await this.userRepository.updateProfile({
        user_id,
        name,
        email,
        password,
      });
    }
  }
}

export default UpdateProfileService;
