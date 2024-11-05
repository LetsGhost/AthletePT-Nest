import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  private readonly logger = new Logger(UserService.name);
  async createUser(userData: any) {
    try {
      const existingUser = await this.userModel.findOne({
        email: userData.email,
      });

      if (existingUser) {
        this.logger.error('User already exists');
        return {
          success: false,
          code: 400,
          message: 'User already exists',
        };
      }

      const user = new this.userModel({
        email: userData.email,
        password: userData.password,
        role: 'user',
      });
      await user.save();

      this.logger.log('User created successfully');
      return {
        success: true,
        code: 201,
        user: user,
      };
    } catch (error) {
      this.logger.error('Error in creating user', error);
      return {
        success: false,
        code: 500,
        message: 'Error in creating user',
      };
    }
  }
}
