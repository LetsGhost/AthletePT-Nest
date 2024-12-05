import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ProtocolDocument = HydratedDocument<Protocol>;

@Schema()
export class ProtocolExercise {
  _id: Types.ObjectId;

  @Prop()
  exercises: string;

  @Prop()
  weight: number[];

  @Prop()
  repetitions: number[];
}

@Schema()
export class ProtocolExerciseDay {
  _id: Types.ObjectId;

  @Prop()
  dayNumber: number;

  @Prop()
  type: string;

  @Prop()
  comment: {
    scale: number;
    notes: string;
  };

  @Prop({ type: [ProtocolExercise] })
  exercises: ProtocolExercise[];

  @Prop({ default: Date.now })
  createdAt: Date;
}

@Schema({
  timestamps: true,
})
export class Protocol {
  _id: Types.ObjectId;

  @Prop({ type: [ProtocolExerciseDay] })
  exerciseDays: ProtocolExerciseDay[];

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const ProtocolSchema = SchemaFactory.createForClass(Protocol);
