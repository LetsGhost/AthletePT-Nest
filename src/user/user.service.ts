import { Injectable, Logger } from '@nestjs/common';
import { User } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ServiceResponse } from 'src/common/interfaces/service-response.interface';
import { CreateUserDto } from './Dto/create-user.dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<ServiceResponse<User>> {
    try {
      const createdUser = await this.userModel.create(createUserDto);

      return {
        success: true,
        code: 201,
        message: 'User created successfully',
        data: createdUser,
      };
    } catch (error) {
      this.logger.error('Error creating user', error);
      return {
        success: false,
        code: 500,
        message: 'Error creating user',
      };
    }
  }
}
