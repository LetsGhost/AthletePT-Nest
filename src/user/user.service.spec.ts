import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';

describe('UserService', () => {
  let service: UserService;
  let userModel: Model<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken(User.name),
          useValue: {
            findOne: jest.fn(),
            save: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userModel = module.get<Model<User>>(getModelToken(User.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('UserService', () => {
    let service: UserService;
    let userModel: Model<User>;

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          UserService,
          {
            provide: getModelToken(User.name),
            useValue: {
              findOne: jest.fn(),
              save: jest.fn(),
              create: jest.fn(),
            },
          },
        ],
      }).compile();

      service = module.get<UserService>(UserService);
      userModel = module.get<Model<User>>(getModelToken(User.name));
    });

    it('should be defined', () => {
      expect(service).toBeDefined();
    });

    it('should return error if user already exists', async () => {
      jest
        .spyOn(userModel, 'findOne')
        .mockResolvedValueOnce({ email: 'test@example.com' });

      const result = await service.createUser({
        email: 'test@example.com',
        password: 'password123',
      });

      expect(result).toEqual({
        success: false,
        code: 400,
        message: 'User already exists',
      });
    });

    it('should create a new user successfully', async () => {
      jest.spyOn(userModel, 'findOne').mockResolvedValueOnce(null);
      jest.spyOn(userModel.prototype, 'save').mockResolvedValueOnce({
        _id: 'userId',
        email: 'test@example.com',
        password: 'hashedPassword',
        role: 'user',
      });

      const result = await service.createUser({
        email: 'test@example.com',
        password: 'password123',
      });

      expect(result).toEqual({
        success: true,
        code: 201,
        user: {
          _id: 'userId',
          email: 'test@example.com',
          password: 'hashedPassword',
          role: 'user',
        },
      });
    });

    it('should return error if user creation fails', async () => {
      jest.spyOn(userModel, 'findOne').mockResolvedValueOnce(null);
      const userInstance = new userModel({
        email: 'test@example.com',
        password: 'password123',
      });
      jest
        .spyOn(userInstance, 'save')
        .mockRejectedValueOnce(new Error('Error in creating user'));

      jest.spyOn(userModel, 'create').mockResolvedValueOnce(userInstance);

      const result = await service.createUser({
        email: 'test@example.com',
        password: 'password123',
      });

      expect(result).toEqual({
        success: false,
        code: 500,
        message: 'Error in creating user',
      });
    });

    it('should log an error if user already exists', async () => {
      const loggerSpy = jest.spyOn(service['logger'], 'error');
      jest
        .spyOn(userModel, 'findOne')
        .mockResolvedValueOnce({ email: 'test@example.com' });

      await service.createUser({
        email: 'test@example.com',
        password: 'password123',
      });

      expect(loggerSpy).toHaveBeenCalledWith('User already exists');
    });

    it('should log a success message when user is created', async () => {
      const loggerSpy = jest.spyOn(service['logger'], 'log');
      jest.spyOn(userModel, 'findOne').mockResolvedValueOnce(null);
      jest.spyOn(userModel.prototype, 'save').mockResolvedValueOnce({
        _id: 'userId',
        email: 'test@example.com',
        password: 'hashedPassword',
        role: 'user',
      });

      await service.createUser({
        email: 'test@example.com',
        password: 'password123',
      });

      expect(loggerSpy).toHaveBeenCalledWith('User created successfully');
    });

    it('should log an error if user creation fails', async () => {
      const loggerSpy = jest.spyOn(service['logger'], 'error');
      jest.spyOn(userModel, 'findOne').mockResolvedValueOnce(null);
      const userInstance = new userModel({
        email: 'test@example.com',
        password: 'password123',
      });
      jest
        .spyOn(userInstance, 'save')
        .mockRejectedValueOnce(new Error('Error in creating user'));

      await service.createUser({
        email: 'test@example.com',
        password: 'password123',
      });

      expect(loggerSpy).toHaveBeenCalledWith(
        'Error in creating user',
        expect.any(Error),
      );
    });
  });

  it('should return error if user creation fails', async () => {
    jest.spyOn(userModel, 'findOne').mockResolvedValueOnce(null);
    const userInstance = new userModel({
      email: 'test@example.com',
      password: 'password123',
    });
    jest
      .spyOn(userInstance, 'save')
      .mockRejectedValueOnce(new Error('Error in creating user'));

    jest.spyOn(userModel, 'create').mockResolvedValueOnce(userInstance);

    const result = await service.createUser({
      email: 'test@example.com',
      password: 'password123',
    });

    expect(result).toEqual({
      success: false,
      code: 500,
      message: 'Error in creating user',
    });
  });
});
