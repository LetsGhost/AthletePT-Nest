import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ExercisePlanDocument = HydratedDocument<ExercisePlan>;

@Schema({
  timestamps: true,
})
export class ExercisePlan {
  _id: Types.ObjectId;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const ExercisePlanSchema = SchemaFactory.createForClass(ExercisePlan);
