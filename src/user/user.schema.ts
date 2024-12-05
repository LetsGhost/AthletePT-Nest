import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({
  timestamps: true,
})
export class User {
  _id: Types.ObjectId;

  @Prop({ required: true, unique: true, lowercase: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  role: 'admin' | 'user';

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ type: Types.ObjectId, ref: 'UserInfo' })
  userInfo: { type: Types.ObjectId; ref: 'UserInfo' };

  @Prop({ type: Types.ObjectId, ref: 'ExercisePlan' })
  exercisePlan: { type: Types.ObjectId; ref: 'ExercisePlan' };

  @Prop({ type: Types.ObjectId, ref: 'Protocol' })
  protocol: { type: Types.ObjectId; ref: 'Protocol' };
}

export const UserSchema = SchemaFactory.createForClass(User);
