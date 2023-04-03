import User from '@modules/users/typeorm/entities/User';
import UsersRepository from '@modules/users/typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';

interface IRequest {
  id: string;
  name: string;
  email: string;
  password: string;
}

const EIGHT = 8;

class UpdateUserService {
  public async execute({ id, name, email, password }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findOne(id);

    if (!user) {
      throw new AppError('User not found.');
    }

    const hashedPassword = await hash(password, EIGHT);

    user.name = name;
    user.email = email;
    user.password = hashedPassword;

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserService;
