import User from '@modules/users/typeorm/entities/User';

export interface ICreate {
  name: string;
  email: string;
  password: string;
  avatar?: string;
}

export interface IAvatar {
  user_id: string;
  avatarFilename: string;
}

export interface IDelete {
  id: string;
}

export interface IUpdateUser {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface IUpdateProfile {
  user_id: string;
  name: string;
  email: string;
  password?: string;
  old_password?: string;
}

export interface IOnlyPassword {
  token: string;
  password: string;
}

export interface IUserRepository {
  create({ name, email, password }: ICreate): Promise<User>;
  findByName(name: string): Promise<User| null>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findAll(): Promise<User[]>;
  updateAvatar({ user_id, avatarFilename }: IAvatar):Promise<void>;
  updateUser({ id, name, email, password }: IUpdateUser): Promise<void>;
  updateProfile({ user_id, name, email, password }: IUpdateProfile): Promise<void>;
  updateOnlyPassword({ token, password }: IOnlyPassword): Promise<void>;
}
