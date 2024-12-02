import { Injectable, Logger } from '@nestjs/common';
import { ServiceResponse } from 'src/common/interfaces/service-response.interface';
import { ExercisePlan } from './exercise-plan.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateExercisePlanDto } from './dto/create-exercise-plan.dto';
import { User } from '../user/user.schema';

@Injectable()
export class ExercisePlanService {
  private readonly logger = new Logger(ExercisePlanService.name);

  constructor(
    @InjectModel(ExercisePlan.name)
    private readonly exerciseModel: Model<ExercisePlan>,
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async create(
    CreateExercisePlanDto: CreateExercisePlanDto,
    userId: string,
  ): Promise<ServiceResponse<ExercisePlan>> {
    try {
      const userObjectId = new Types.ObjectId(userId);
      const finalExerciseDays = [];
      let exerciseDay = {
        name: '',
        day: '',
        exercises: [],
      };
      for (const exercise of CreateExercisePlanDto.exercisePlan) {
        if (exercise[1] === 'Name') {
          if (exerciseDay.name) {
            finalExerciseDays.push(exerciseDay);
          }
          exerciseDay = {
            name: '',
            day: '',
            exercises: [],
          };
          continue;
        }

        if (exercise[1] !== 'Name' && exercise[1] !== 'Tag') {
          if (!exerciseDay.name) {
            exerciseDay.name = exercise[1] as string;
            exerciseDay.day = exercise[2] as string;
          }
          exerciseDay.exercises.push({
            name: exercise[3] as string,
            weight: exercise[4] as number,
            sets: exercise[5] as number,
            warmupSets: exercise[6] as number,
            warmupSetsWeight: exercise[7] as string,
            warmupSetsReps: exercise[8] as string,
            reps: exercise[9] as string,
            rest: exercise[10] as string,
            description: exercise[11] as string,
          });
        }
      }

      if (exerciseDay.name) {
        finalExerciseDays.push(exerciseDay);
      }

      const createdExercisePlan = await this.exerciseModel.create({
        exerciseDays: finalExerciseDays,
      });
      await this.userModel.findByIdAndUpdate(
        userObjectId,
        { $set: { exercisePlan: createdExercisePlan._id } },
        { new: true, runValidators: true },
      );

      return {
        success: true,
        code: 201,
        message: 'Exercise plan created successfully',
        data: createdExercisePlan,
      };
    } catch (error) {
      this.logger.error('Error creating exercise plan', error.stack);
      return {
        success: false,
        code: 500,
        message: 'Error creating exercise plan',
      };
    }
  }
}
