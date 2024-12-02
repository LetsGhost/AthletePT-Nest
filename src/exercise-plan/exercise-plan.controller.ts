import { Controller, Logger, Post, Body, Param } from '@nestjs/common';
import { ExercisePlanService } from './exercise-plan.service';
import { UserService } from 'src/user/user.service';
import { CreateExercisePlanDto } from './dto/create-exercise-plan.dto';
import { UpdateUserReferenceDto } from 'src/user/dto/update-user-reference.dto';

@Controller('exercise-plan')
export class ExercisePlanController {
  private readonly logger = new Logger(ExercisePlanController.name);

  constructor(
    private readonly exercisePlanService: ExercisePlanService,
    private readonly userService: UserService,
  ) {}

  @Post('create/:userId')
  async createExercisePlan(
    @Body('exercisePlan') createExercisePlanDto: CreateExercisePlanDto,
    @Param('userId') userId: string,
  ) {
    const result = await this.exercisePlanService.create(createExercisePlanDto);

    const updateUserReferenceDto = new UpdateUserReferenceDto();
    updateUserReferenceDto.referenceId = result.data._id;
    updateUserReferenceDto.referenceName = 'exercisePlan';
    updateUserReferenceDto.userId = userId;

    await this.userService.updateUserReference(updateUserReferenceDto);

    return result;
  }
}
