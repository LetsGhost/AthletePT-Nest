import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UserInfoDocument = HydratedDocument<UserInfo>;

@Schema({
  timestamps: true,
})
export class UserInfo {
  _id: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  goal: string;

  @Prop({ required: true })
  focus: string;

  @Prop({ required: true })
  targetWeight: number;

  @Prop({ required: true })
  currentWeight: number;

  @Prop({ required: true })
  DOB: Date;

  @Prop({ required: true })
  gender: string;

  @Prop({ required: true })
  sports: string;

  @Prop({ required: true })
  location: string;

  @Prop({ required: true })
  conditions: string;

  @Prop({ required: true })
  times: string;

  @Prop({ required: true })
  frequency: string;

  @Prop({ required: true })
  cardio: string;

  @Prop({ required: true })
  issues: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const UserInfoSchema = SchemaFactory.createForClass(UserInfo);
