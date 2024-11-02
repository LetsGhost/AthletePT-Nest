import { Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async createUser(userData: any) {
    try {
      const existingUser = await this.userModel.findOne({ email: userData.email });
    } catch (error) {
      Logger.error('Error in creating user', error);
      return {
        success: false,
        code: 500,
        message: 'Error in creating user',
      };
    }
  }
}
