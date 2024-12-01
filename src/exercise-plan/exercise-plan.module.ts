import { Module } from '@nestjs/common';
import { ExercisePlanService } from './exercise-plan.service';
import { ExercisePlanController } from './exercise-plan.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ExercisePlanSchema } from './exercise-plan.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'ExercisePlan', schema: ExercisePlanSchema },
    ]),
  ],
  providers: [ExercisePlanService],
  controllers: [ExercisePlanController],
})
export class ExercisePlanModule {}
