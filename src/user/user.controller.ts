import { Controller, Logger, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './Dto/create-user.dto';
import { UserInfoService } from 'src/user-info/user-info.service';
import { CreateUserInfoDto } from 'src/user-info/dto/create-user-info.dto';

@Controller('user')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(
    private readonly userService: UserService,
    private readonly userInfoService: UserInfoService,
  ) {}

  @Post('create')
  async createUser(
    @Body('user') createUserDto: CreateUserDto,
    @Body('userInfo') createUserInfoDto: CreateUserInfoDto,
  ) {
    const result = await this.userInfoService.create(createUserInfoDto);

    return this.userService.create(createUserDto, result.data._id);
  }
}
