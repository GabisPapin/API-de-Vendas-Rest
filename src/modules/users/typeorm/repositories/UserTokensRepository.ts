import { EntityRepository, Repository } from 'typeorm';
import UserToken from '@modules/users/typeorm/entities/UserToken';

@EntityRepository(UserToken)
class UserTokensRepository extends Repository<UserToken> {
  public async findByToken(token: string): Promise<UserToken | undefined> {
    const UserToken = await this.findOne({
      where: {
        token,
      },
    });

    return UserToken;
  }

  public async generate(user_id: string): Promise<UserToken> {
    const UserToken = this.create({
      user_id,
    });

    await this.save(UserToken);

    return UserToken;
  }
}

export default UserTokensRepository;
