import { Test, TestingModule } from '@nestjs/testing';
import { ExercisePlanService } from './exercise-plan.service';
import { Model, Types } from 'mongoose';
import { ExercisePlan } from './exercise-plan.schema';
import { getModelToken } from '@nestjs/mongoose';
import { CreateExercisePlanDto } from './dto/create-exercise-plan.dto';
import { User } from '../user/user.schema';

const exercisePlanModelMock = {
  create: jest.fn(),
  save: jest.fn(),
  findOne: jest.fn(),
  findByIdAndUpdate: jest.fn(),
};

describe('ExercisePlanService', () => {
  let service: ExercisePlanService;
  let model: jest.Mocked<Model<ExercisePlan>>;
  let userModel: jest.Mocked<Model<User>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExercisePlanService,
        {
          provide: getModelToken('ExercisePlan'),
          useValue: exercisePlanModelMock,
        },
      ],
    }).compile();

    service = module.get<ExercisePlanService>(ExercisePlanService);
    model = module.get(getModelToken('ExercisePlan'));
    userModel = module.get(getModelToken('User'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should log the exercise plan', async () => {
      const mockedData = [
        [
          {
            name: 'Oberkörper',
            day: 'Dienstag',
            exercises: [
              {
                name: 'Bankdrücken',
                weight: 15,
                sets: 3,
                warmupSets: 2,
                warmupSetsWeight: '0/10',
                warmupSetsReps: '12/6',
                reps: '8-10',
                rest: '3-5',
                description: 'Langhantel',
              },
              {
                name: 'enges Rudern',
                weight: 45,
                sets: 3,
                warmupSets: 0,
                warmupSetsWeight: 0,
                warmupSetsReps: 0,
                reps: '10-12',
                rest: '3-5',
                description: 'Kabelzug',
              },
              {
                name: 'Trizepsdrücken',
                weight: 12.5,
                sets: 3,
                warmupSets: 0,
                warmupSetsWeight: 0,
                warmupSetsReps: 0,
                reps: '10-12',
                rest: '2-3',
                description: 'Kabelzug',
              },
              {
                name: 'Bizepscurls',
                weight: 7.5,
                sets: 3,
                warmupSets: 0,
                warmupSetsWeight: 0,
                warmupSetsReps: 0,
                reps: '10-12',
                rest: '2-3',
                description: 'Kurzhanteln',
              },
            ],
          },
          {
            name: 'Beine',
            day: 'Mittwoch',
            exercises: [
              {
                name: 'Kniebeugen',
                weight: 20,
                sets: 5,
                warmupSets: 2,
                warmupSetsWeight: '0/10',
                warmupSetsReps: '12/6',
                reps: '8-10',
                rest: '3-5',
                description: 'Langhantel',
              },
              {
                name: 'LegCurls',
                weight: 73,
                sets: 3,
                warmupSets: 0,
                warmupSetsWeight: 0,
                warmupSetsReps: 0,
                reps: '10-12',
                rest: '2-3',
                description: 'Maschiene',
              },
              {
                name: 'LegExtention',
                weight: 64,
                sets: 2,
                warmupSets: 0,
                warmupSetsWeight: 0,
                warmupSetsReps: 0,
                reps: '10-12',
                rest: '2-3',
                description: 'Maschiene',
              },
            ],
          },
        ],
      ];
      model.create.mockResolvedValueOnce(mockedData as any);

      const createExercisePlanDto: CreateExercisePlanDto = {
        exercisePlan: [
          [
            null,
            'Name',
            'Tag',
            'Übung',
            'Gewicht',
            'Sätze',
            'Aufwäremsätze',
            'Aufwärmen Ge.',
            'Aufwärmen Wdh.',
            'Wiederholungen',
            'Pause',
            'Ausführung',
          ],
          [
            null,
            'Oberkörper',
            'Dienstag',
            'Bankdrücken',
            15,
            3,
            2,
            '0/10',
            '12/6',
            '8-10',
            '3-5',
            'Langhantel',
          ],
          [
            null,
            'Oberkörper',
            'Dienstag',
            'enges Rudern',
            45,
            3,
            0,
            0,
            0,
            '10-12',
            '3-5',
            'Kabelzug',
          ],
          [
            null,
            'Oberkörper',
            'Dienstag',
            'Trizepsdrücken',
            12.5,
            3,
            0,
            0,
            0,
            '10-12',
            '2-3',
            'Kabelzug',
          ],
          [
            null,
            'Oberkörper',
            'Dienstag',
            'Bizepscurls',
            7.5,
            3,
            0,
            0,
            0,
            '10-12',
            '2-3',
            'Kurzhanteln',
          ],
          [
            null,
            'Name',
            'Tag',
            'Übung',
            'Gewicht',
            'Sätze',
            'Aufwäremsätze',
            'Aufwärmen Ge.',
            'Aufwärmen Wdh.',
            'Wiederholungen',
            'Pause',
            'Ausführung',
          ],
          [
            null,
            'Beine',
            'Mittwoch',
            'Kniebeugen',
            20,
            5,
            2,
            '0/10',
            '12/6',
            '8-10',
            '3-5',
            'Langhantel',
          ],
          [
            null,
            'Beine',
            'Mittwoch',
            'LegCurls',
            73,
            3,
            0,
            0,
            0,
            '10-12',
            '2-3',
            'Maschiene',
          ],
          [
            null,
            'Beine',
            'Mittwoch',
            'LegExtention',
            64,
            2,
            0,
            0,
            0,
            '10-12',
            '2-3',
            'Maschiene',
          ],
        ],
      };

      const userId = new Types.ObjectId().toHexString();
      const result = await service.create(createExercisePlanDto, userId);

      expect(result).toEqual({
        success: true,
        code: 201,
        message: 'Exercise plan created successfully',
        data: mockedData,
      });
      expect(model.create).toHaveBeenCalledWith({
        exerciseDays: mockedData,
      });
      expect(userModel.findByIdAndUpdate).toHaveBeenCalledWith(
        new Types.ObjectId(userId),
        { $set: { exercisePlan: result.data._id } },
        { new: true, runValidators: true },
      );
    });
  });
});
