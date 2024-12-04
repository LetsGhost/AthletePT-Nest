import {
  Controller,
  Logger,
  Post,
  Body,
  Param,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ExercisePlanService } from './exercise-plan.service';
import { UserService } from 'src/user/user.service';
import { UpdateUserReferenceDto } from 'src/user/dto/update-user-reference.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import * as excelJs from 'exceljs';

@Controller('exercise-plan')
export class ExercisePlanController {
  private readonly logger = new Logger(ExercisePlanController.name);

  constructor(
    private readonly exercisePlanService: ExercisePlanService,
    private readonly userService: UserService,
  ) {}

  @Post('create/:userId')
  @UseInterceptors(FileInterceptor('excelFile'))
  async createExercisePlan(
    @UploadedFile() excelFile: Express.Multer.File,
    @Param('userId') userId: string,
  ) {
    const workbook = new excelJs.Workbook();
    await workbook.xlsx.load(excelFile.buffer);
    const worksheet = workbook.getWorksheet(1);

    const data = [];
    worksheet.eachRow((row) => {
      const rowData = row.values;
      data.push(rowData);
    });

    const result = await this.exercisePlanService.create({
      exercisePlan: data,
    });

    const updateUserReferenceDto = new UpdateUserReferenceDto();
    updateUserReferenceDto.referenceId = result.data._id;
    updateUserReferenceDto.referenceName = 'exercisePlan';
    updateUserReferenceDto.userId = userId;

    await this.userService.updateUserReference(updateUserReferenceDto);

    return result;
  }
}
