import { Controller, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';
import { UserInfoService } from 'src/user-info/user-info.service';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private userInfoService: UserInfoService,
  ) {}

  @Post('create')
  async createUser(@Body() userData: any, @Res() res: Response) {
    const userInfoData = {
      name: userData.name as string,
      goal: userData.goal as string,
      focus: userData.focus as string,
      targetWeight: userData.targetWeight as string,
      currentWeight: userData.currentWeight as string,
      DOB: userData.DOB as string,
      gender: userData.gender as string,
      sports: userData.sports as string,
      location: userData.location,
      conditions: userData.conditions as string,
      times: userData.times as string,
      frequency: userData.frequency as string,
      cardio: userData.cardio as string,
      issues: userData.issues as string,
    };

    const user = await this.userService.createUser(userData);

    if (user.success) {
      await this.userInfoService
        .createUserInfo(userInfoData, user.user._id as string)
        .then((userInfo) => {
          if (userInfo.success) {
            return res.status(userInfo.code).json({
              success: true,
            });
          }

          return res.status(userInfo.code).json({
            success: false,
            message: userInfo.message,
          });
        });
    }

    return res.status(user.code).json({
      success: false,
      message: user.message,
    });
  }
}
