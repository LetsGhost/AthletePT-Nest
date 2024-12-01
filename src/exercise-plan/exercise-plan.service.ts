import { Injectable, Logger } from '@nestjs/common';
import { ServiceResponse } from 'src/common/interfaces/service-response.interface';
import { ExercisePlan } from './exercise-plan.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ExercisePlanService {
  private readonly logger = new Logger(ExercisePlanService.name);

  constructor(
    @InjectModel(ExercisePlan.name)
    private readonly exerciseModel: Model<ExercisePlan>,
  ) {}

  async create(): Promise<ServiceResponse<ExercisePlan>> {
    try {
    } catch (error) {
      return {
        success: false,
        code: 500,
        message: 'Error creating exercise plan',
      };
    }
  }
}
