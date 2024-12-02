import { Injectable, Logger } from '@nestjs/common';
import { User } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ServiceResponse } from 'src/common/interfaces/service-response.interface';
import { CreateUserDto } from './Dto/create-user.dto';
import { UpdateUserReferenceDto } from './Dto/update-user-reference.dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(
    createUserDto: CreateUserDto,
    userInfoId: Types.ObjectId,
  ): Promise<ServiceResponse<User>> {
    try {
      const createdUser = await this.userModel.create({
        ...createUserDto,
        role: 'user',
        userInfo: userInfoId,
      });

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

  async findOneByEmail(email: string): Promise<ServiceResponse<User>> {
    try {
      const user = await this.userModel.findOne({ email });

      if (!user) {
        return {
          success: false,
          code: 404,
          message: 'User not found',
        };
      }

      return {
        success: true,
        code: 200,
        message: 'User found',
        data: user,
      };
    } catch (error) {
      this.logger.error('Error finding user by email', error);
      return {
        success: false,
        code: 500,
        message: 'Error finding user by email',
      };
    }
  }

  async updateUserReference(
    updateUserReferenceDto: UpdateUserReferenceDto,
  ): Promise<ServiceResponse<User>> {
    try {
      const userObjectId = new Types.ObjectId(updateUserReferenceDto.userId);
      const update = {
        $set: {
          [updateUserReferenceDto.referenceName]:
            updateUserReferenceDto.referenceId,
        },
      };
      const updatedUser = await this.userModel.findByIdAndUpdate(
        userObjectId,
        update,
        { new: true, runValidators: true },
      );

      if (!updatedUser) {
        return {
          success: false,
          code: 404,
          message: 'User not found',
        };
      }

      return {
        success: true,
        code: 200,
        message: 'User updated successfully',
        data: updatedUser,
      };
    } catch (error) {
      this.logger.error('Error updating user reference', error);
      return {
        success: false,
        code: 500,
        message: 'Error updating user reference',
      };
    }
  }
}
