import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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
      return this.userModel.findById(id).exec();
    } catch {
      return undefined;
    }
  }

  async create(dto: NewModel<User>): Promise<User> {
    const createdUser = new this.userModel(dto);
    const user = await createdUser.save();
    return user;
  }
}
