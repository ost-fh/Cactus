import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import AuthProvider from 'src/auth/auth-provider';
import { User, UserDocument } from './user.schema';

type NewModel<T> = Omit<T, '_id'>;

@Injectable()
export default class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findOneByUsername(username: string): Promise<User | undefined | null> {
    try {
      return this.userModel.findOne({ username }).exec();
    } catch {
      return undefined;
    }
  }

  async findById(id: string): Promise<User | undefined | null> {
    try {
      const user = await this.userModel.findById(id).exec();
      if (!user) {
        return user;
      }
      return { ...user?.toObject(), hashedPassword: '' };
    } catch {
      return undefined;
    }
  }

  async findOneByProviderId(
    providerId: string,
    provider: AuthProvider,
  ): Promise<User | undefined | null> {
    try {
      return this.userModel.findOne({ providerId, provider }).exec();
    } catch {
      return undefined;
    }
  }

  async findOrCreate(
    providerId: string,
    provider: AuthProvider,
    username: string,
    email: string,
  ): Promise<User> {
    let user = await this.findOneByProviderId(providerId, provider);
    console.log('okdfads');
    if (!user) {
      user = await this.create({
        username,
        email,
        hashedPassword: 'dfafdf',
        provider: provider,
        providerId: providerId,
      });
    }
    return user;
  }

  async create(dto: NewModel<User>): Promise<User> {
    const createdUser = new this.userModel(dto);
    const user = await createdUser.save();
    return user;
  }
}
