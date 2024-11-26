import { Module } from '@nestjs/common';
import { UserInfoService } from './user-info.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserInfoSchema } from './user-info.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'UserInfo', schema: UserInfoSchema }]),
  ],
  providers: [UserInfoService],
  exports: [UserInfoService],
})
export class UserInfoModule {}
