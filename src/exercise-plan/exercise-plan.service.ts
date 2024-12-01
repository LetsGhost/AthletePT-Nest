import { Injectable, Logger } from '@nestjs/common';
import { ServiceResponse } from 'src/common/interfaces/service-response.interface';
import { ExercisePlan } from './exercise-plan.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateExercisePlanDto } from './dto/create-exercise-plan.dto';

@Injectable()
export class ExercisePlanService {
  private readonly logger = new Logger(ExercisePlanService.name);

  constructor(
    @InjectModel(ExercisePlan.name)
    private readonly exerciseModel: Model<ExercisePlan>,
  ) {}

  async create(
    CreateExercisePlanDto: CreateExercisePlanDto,
  ): Promise<ServiceResponse<ExercisePlan>> {
    try {
      const finalExercisePlan = [];
      let exerciseDay = {
        name: '',
        tag: '',
        exercises: [],
      };
      for (const exercise of CreateExercisePlanDto.exercisePlan) {
        if (exercise[1] === 'Name') {
          if (exerciseDay.name) {
            finalExercisePlan.push(exerciseDay);
          }
          exerciseDay = {
            name: exercise[1] as string,
            tag: exercise[2] as string,
            exercises: [],
          };
          continue;
        }

        if (exercise[1] !== 'Name' && exercise[1] !== 'Tag') {
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
        finalExercisePlan.push(exerciseDay);
      }
      console.log(JSON.stringify(finalExercisePlan));
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
