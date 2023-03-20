import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongoSchema } from 'mongoose';
import AuthProvider from 'src/auth/auth-provider';

export type UserDocument = HydratedDocument<User>;

@Schema({
  timestamps: true,
})
export class User {
  _id: MongoSchema.Types.ObjectId;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  /** With which social login provider the user has logged in */
  provider: AuthProvider;

  @Prop({ required: true })
  /** The user ID that the user has at his/her `provider` */
  providerId: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
