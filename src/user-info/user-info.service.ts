import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserInfo } from './user-info.schema';
import { User } from '../user/user.schema';

@Injectable()
export class UserInfoService {
  constructor(
    @InjectModel(UserInfo.name) private userInfoModel: Model<UserInfo>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}
  private readonly logger = new Logger(UserInfoService.name);

  async createUserInfo(userInfoData: any, userId: string) {
    try {
      const userInfo = new this.userInfoModel(userInfoData);
      await userInfo.save();

      // Update the relation in the User model
      await this.userModel.findByIdAndUpdate(userId, {
        userInfo: userInfo._id,
      });

      this.logger.log('User info created successfully');
      return {
        success: true,
        code: 200,
        message: 'User info created successfully',
      };
    } catch (error) {
      this.logger.error('Error in creating user info', error);
      return {
        success: false,
        code: 500,
        message: 'Error in creating user info',
      };
    }
  }
}
