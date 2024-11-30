import { Injectable, Logger } from '@nestjs/common';
import { UserInfo } from './user-info.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserInfoDto } from './dto/create-user-info.dto';
import { ServiceResponse } from 'src/common/interfaces/service-response.interface';

@Injectable()
export class UserInfoService {
  private readonly logger = new Logger(UserInfoService.name);

  constructor(
    @InjectModel(UserInfo.name) private readonly userInfoModel: Model<UserInfo>,
  ) {}

  async create(
    createUserInfoDto: CreateUserInfoDto,
  ): Promise<ServiceResponse<UserInfo>> {
    try {
      const createdUserInfo =
        await this.userInfoModel.create(createUserInfoDto);

      return {
        success: true,
        code: 201,
        message: 'User info created successfully',
        data: createdUserInfo,
      };
    } catch (error) {
      this.logger.error('Error creating user info', error);
      return {
        success: false,
        code: 500,
        message: 'Error creating user info',
      };
    }
  }
}
