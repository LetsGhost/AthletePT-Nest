import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { UserInfo } from '../user-info/user-info.schema';

@Schema()
export class User extends Document {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: Date.now })
  created_at: Date;

  @Prop({ required: true })
  role: 'admin' | 'user';

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'UserInfo' })
  userInfo: UserInfo;
}

export const UserSchema = SchemaFactory.createForClass(User);

// Pre-save hook to hash the password
UserSchema.pre<User>('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});
