import { Repository } from 'typeorm';
import { dataSource } from '@shared/typeorm';
import UserToken from '@modules/users/typeorm/entities/UserToken';

class UserTokensRepository {
  private ormRepository: Repository<UserToken>

  constructor() {
    this.ormRepository = dataSource.getRepository(UserToken);
  }

  public async findByToken(token: string): Promise<UserToken | null> {
    const UserToken = await this.ormRepository.findOneBy({ token });

    return UserToken;
  }

  public async generate(user_id: string): Promise<UserToken> {
    const UserToken = this.ormRepository.create({ user_id });

    await this.ormRepository.save(UserToken);

    return UserToken;
  }
}

export default UserTokensRepository;
