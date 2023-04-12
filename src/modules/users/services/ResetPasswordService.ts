import AppError from '@shared/errors/AppError';
import { isAfter, addHours } from 'date-fns';
import UserRepository from '@modules/users/typeorm/repositories/UsersRepository';
import UserTokensRepository from '@modules/users/typeorm/repositories/UserTokensRepository';
import { IUserRepository } from '@modules/users/typeorm/repositories/UserRepositoryInterface';
import { IUserTokenRepository } from '@modules/users/typeorm/repositories/UserTokenRepositoryInterface';

interface IRequest {
  token: string;
  password: string;
}

class ResetPasswordService {
  private userRepository: IUserRepository;
  private userTokenRepository: IUserTokenRepository;
  constructor() {
    this.userRepository = new UserRepository();
    this.userTokenRepository = new UserTokensRepository();
  }

  public async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.userTokenRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('User Token does not exists.');
    }

    const user = await this.userRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User does not exists.');
    }

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expired.');
    }

    await this.userRepository.updateOnlyPassword({ token, password});
  }
}

export default ResetPasswordService;
