import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.schema';
import { UserInfoModule } from '../user-info/user-info.module';

@Module({
  imports: [
    UserInfoModule,
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
