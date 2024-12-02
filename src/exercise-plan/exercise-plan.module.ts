import { Module } from '@nestjs/common';
import { ExercisePlanService } from './exercise-plan.service';
import { ExercisePlanController } from './exercise-plan.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ExercisePlanSchema } from './exercise-plan.schema';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'ExercisePlan', schema: ExercisePlanSchema },
    ]),
    UserModule,
  ],
  providers: [ExercisePlanService],
  controllers: [ExercisePlanController],
})
export class ExercisePlanModule {}
