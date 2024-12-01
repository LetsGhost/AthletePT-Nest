import { Test, TestingModule } from '@nestjs/testing';
import { ExercisePlanService } from './exercise-plan.service';

describe('ExercisePlanService', () => {
  let service: ExercisePlanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExercisePlanService],
    }).compile();

    service = module.get<ExercisePlanService>(ExercisePlanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
