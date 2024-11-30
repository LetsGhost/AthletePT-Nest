import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  _id: Types.ObjectId;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ type: Types.ObjectId, ref: 'UserInfo' })
  userInfo: { type: Types.ObjectId; ref: 'UserInfo' };
}

// TODO: Add a pre hook to hash the password before saving the user to the database.

export const UserSchema = SchemaFactory.createForClass(User);
