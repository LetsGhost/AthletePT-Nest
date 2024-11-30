import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { Model, Types } from 'mongoose';
import { User } from './user.schema';
import { getModelToken } from '@nestjs/mongoose';
import { CreateUserDto } from './Dto/create-user.dto';

const userModelMock = {
  create: jest.fn(),
  save: jest.fn(),
};

describe('UserService', () => {
  let service: UserService;
  let model: jest.Mocked<Model<User>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken('User'),
          useValue: userModelMock,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    model = module.get(getModelToken('User'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should insert a new user', async () => {
      const mockedUser: CreateUserDto = {
        email: 'user@mail.com',
        password: 'password',
      };
      model.create.mockResolvedValueOnce(mockedUser as any);

      const createUserDto = {
        email: 'user@mail.com',
        password: 'password',
      };
      const userInfoId = new Types.ObjectId('674b35a0986bacefaa3d4a12');
      const result = await service.create(createUserDto, userInfoId);

      expect(result).toEqual({
        success: true,
        code: 201,
        message: 'User created successfully',
        data: mockedUser,
      });
      expect(model.create).toHaveBeenCalledWith({
        ...createUserDto,
        role: 'user',
        userInfo: userInfoId,
      });
    });
  });
});
