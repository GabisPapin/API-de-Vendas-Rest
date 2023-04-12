import { Repository } from 'typeorm';
import { dataSource } from '@shared/typeorm';
import User from '@modules/users/typeorm/entities/User';
import UserToken from '@modules/users/typeorm/entities/UserToken';
import { IAvatar, ICreate, IOnlyPassword, IUpdateProfile, IUpdateUser } from '@modules/users/typeorm/repositories/UserRepositoryInterface';
import { hash } from 'bcryptjs';
import DiskStorageProvider from '@shared/providers/StorageProvider/DiskStorageProvider';
import uploadConfig from '@config/upload';
import S3StorageProvider from '@shared/providers/StorageProvider/S3StorageProvider';

const EIGHT = 8;

class UserRepository {
  private ormRepository: Repository<User>
  private ormTokenRepository: Repository<UserToken>

  constructor() {
    this.ormRepository = dataSource.getRepository(User);
    this.ormTokenRepository = dataSource.getRepository(UserToken);
  }

  public async create({ name, email, password }: ICreate): Promise<User> {
    const hashedPassword = await hash(password, EIGHT);

    const user = this.ormRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await this.ormRepository.save(user);

    return user;
  }

  public async findByName(name: string): Promise<User | null> {
    const user = await this.ormRepository.findOneBy({ name });

    return user;
  }

  public async findById(id: string): Promise<User | null> {
    const user = await this.ormRepository.findOneBy({ id });

    return user;
  }

  public async findByEmail(email: string): Promise<User | null> {
    const user = await this.ormRepository.findOneBy({ email });

    return user;
  }

  public async findAll(): Promise<User[]> {
    const users = await this.ormRepository.find();

    return users;
  }

  public async updateUser({ id, name, email, password }: IUpdateUser): Promise<void> {
    const hashedPassword = await hash(password, EIGHT);
    await this.ormRepository.update(id, {
      name,
      email,
      password: hashedPassword,
    });
  }

  public async updateAvatar({ user_id, avatarFilename }: IAvatar): Promise<void> {
    const id = user_id;
    const user = await this.ormRepository.findOneBy({ id });

    if (!user) {
      throw Error('Not found.')
    }

    if (uploadConfig.driver === 's3') {
      const s3Provider = new S3StorageProvider();
      if (user.avatar) {
        await s3Provider.deleteFile(user.avatar);
      }
      const filename = await s3Provider.saveFile(avatarFilename);
      await this.ormRepository.update(user_id, {
        avatar: filename,
      });
    } else {
      const diskProvider = new DiskStorageProvider();
      if (user.avatar) {
        await diskProvider.deleteFile(user.avatar);
      }

      const filename = await diskProvider.saveFile(avatarFilename);
      await this.ormRepository.update(user_id, {
        avatar: filename,
      });
    }
  }

  public async updateProfile({
    user_id,
    name,
    email,
    password,
  }: IUpdateProfile): Promise<void> {
    if (!password) {
      throw new Error('password is required.')
    }

    const hashedPassword = await hash(password, EIGHT);

    await this.ormRepository.update(user_id, {
      name,
      email,
      password: hashedPassword,
    });
  }

  public async updateOnlyPassword({ token, password }: IOnlyPassword): Promise<void> {
    const userToken = await this.ormTokenRepository.findOneBy({ token });

    if (!userToken) {
      throw new Error('token not found.')
    }

    const hashedPassword = await hash(password, EIGHT);

    await this.ormRepository.update(userToken.user_id, {
      password: hashedPassword,
    });
  }
}

export default UserRepository;
