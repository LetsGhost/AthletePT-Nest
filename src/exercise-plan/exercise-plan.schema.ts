import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ExercisePlanDocument = HydratedDocument<ExercisePlan>;

@Schema()
export class Exercise {
  @Prop({ required: true })
  exercise: string;

  @Prop({ required: true })
  weight: string;

  @Prop({ required: true })
  sets: number;

  @Prop({ required: true })
  warmupSets: number;

  @Prop({ required: true })
  warmupWeight: string;

  @Prop({ required: true })
  warmupRepetitions: string;

  @Prop({ required: true })
  repetitions: string;

  @Prop({ required: true })
  rest: string;

  @Prop({ required: true })
  execution: string;
}

@Schema()
export class ExerciseDay {
  @Prop({ required: true })
  dayNumber: number;

  @Prop({ required: true })
  weekDay: string;

  @Prop({ required: true })
  type: string;

  @Prop({ default: false, required: true })
  trainingDone: boolean;

  @Prop({ default: false, required: true })
  trainingMissed: boolean;

  @Prop({ required: true })
  exercises: Exercise[];

  @Prop({ type: Types.ObjectId, ref: 'Warmup' })
  warmup: { type: Types.ObjectId; ref: 'Warmup' }[];
}

@Schema({
  timestamps: true,
})
export class ExercisePlan {
  _id: Types.ObjectId;

  @Prop({ required: true })
  exerciseDays: ExerciseDay[];

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const ExercisePlanSchema = SchemaFactory.createForClass(ExercisePlan);
