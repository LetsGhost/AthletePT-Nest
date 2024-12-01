import { Test, TestingModule } from '@nestjs/testing';
import { ExercisePlanService } from './exercise-plan.service';
import { Model } from 'mongoose';
import { ExercisePlan } from './exercise-plan.schema';
import { getModelToken } from '@nestjs/mongoose';

const exercisePlanModelMock = {
  create: jest.fn(),
  save: jest.fn(),
  findOne: jest.fn(),
};

describe('ExercisePlanService', () => {
  let service: ExercisePlanService;
  let model: jest.Mocked<Model<ExercisePlan>>;

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
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should log the exercise plan', async () => {
      const mockedData = {

        exercisePlan:[
          [
            null,
            "Name",
            "Tag",
            "Übung",
            "Gewicht",
            "Sätze",
            "Aufwäremsätze",
            "Aufwärmen Ge.",
            "Aufwärmen Wdh.",
            "Wiederholungen",
            "Pause",
            "Ausführung"
          ],
          [
            null,
            "Oberkörper",
            "Dienstag",
            "Bankdrücken",
            15,
            3,
            2,
            "0/10",
            "12/6",
            "8-10",
            "3-5",
            "Langhantel"
          ],
          [
            null,
            "Oberkörper",
            "Dienstag",
            "enges Rudern",
            45,
            3,
            0,
            0,
            0,
            "10-12",
            "3-5",
            "Kabelzug"
          ],
          [
            null,
            "Oberkörper",
            "Dienstag",
            "Trizepsdrücken",
            12.5,
            3,
            0,
            0,
            0,
            "10-12",
            "2-3",
            "Kabelzug"
          ],
          [
            null,
            "Oberkörper",
            "Dienstag",
            "Bizepscurls",
            7.5,
            3,
            0,
            0,
            0,
            "10-12",
            "2-3",
            "Kurzhanteln"
          ],
          [
            null,
            "Name",
            "Tag",
            "Übung",
            "Gewicht",
            "Sätze",
            "Aufwäremsätze",
            "Aufwärmen Ge.",
            "Aufwärmen Wdh.",
            "Wiederholungen",
            "Pause",
            "Ausführung"
          ],
          [
            null,
            "Beine",
            "Mittwoch",
            "Kniebeugen",
            20,
            5,
            2,
            "0/10",
            "12/6",
            "8-10",
            "3-5",
            "Langhantel"
          ],
          [
            null,
            "Beine",
            "Mittwoch",
            "LegCurls",
            73,
            3,
            0,
            0,
            0,
            "10-12",
            "2-3",
            "Maschiene"
          ],
          [
            null,
            "Beine",
            "Mittwoch",
            "LegExtention",
            64,
            2,
            0,
            0,
            0,
            "10-12",
            "2-3",
            "Maschiene"
          ]
        ]
      };

      await service.create(mockedData);
    });
  });
});
