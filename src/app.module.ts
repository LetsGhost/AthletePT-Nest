import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserInfoModule } from './user-info/user-info.module';
import { config } from 'dotenv';
config();

@Module({
  imports: [
    UserModule,
    MongooseModule.forRoot(
      process.env.MONGO_URI
        ? process.env.MONGO_URI
        : (console.log('MONGO_URI is not defined'), process.exit(1)),
    ),
    UserInfoModule,
  ],
})
export class AppModule {}
