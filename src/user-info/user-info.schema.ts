import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class UserInfo extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  goal: string;

  @Prop()
  focus: string;

  @Prop()
  targetWeight: number;

  @Prop()
  currentWeight: number;

  @Prop()
  DOB: Date;

  @Prop()
  gender: string;

  @Prop()
  sports: string;

  @Prop()
  location: string;

  @Prop()
  conditions: string;

  @Prop()
  times: string;

  @Prop()
  frequency: string;

  @Prop()
  cardio: string;

  @Prop()
  issues: string;
}

export const UserSchema = SchemaFactory.createForClass(UserInfo);
