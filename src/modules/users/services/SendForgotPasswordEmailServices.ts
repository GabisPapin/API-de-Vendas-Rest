import AppError from '@shared/errors/AppError';
import path from 'path';
import UserRepository from '@modules/users/typeorm/repositories/UsersRepository';
import UserTokensRepository from '@modules/users/typeorm/repositories/UserTokensRepository';
import EtherealMail from '@config/mail/EtherealMail';
import { IUserRepository } from '@modules/users/typeorm/repositories/UserRepositoryInterface';
import { IUserTokenRepository } from '@modules/users/typeorm/repositories/UserTokenRepositoryInterface';

interface IRequest {
  email: string;
}

class SendForgotPasswordEmailService {
  private userRepository: IUserRepository;
  private userTokenRepository: IUserTokenRepository;
  constructor() {
    this.userRepository = new UserRepository();
    this.userTokenRepository = new UserTokensRepository();
  }

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exists.');
    }

    const { token } = await this.userTokenRepository.generate(user.id);

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs',
    );

    await EtherealMail.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[API Vendas] Recuperação de senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `${process.env.APP_WEB_URL}/reset_password?token=${token}`,
        },
      },
    });
  }
}

export default SendForgotPasswordEmailService;
