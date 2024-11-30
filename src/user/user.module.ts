import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, User } from './user.schema';
import { hash, genSalt } from 'bcrypt';
import { UserInfoModule } from 'src/user-info/user-info.module';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: 'User',
        useFactory: () => {
          const schema = UserSchema;

          schema.pre<User>('save', async function () {
            const salt = await genSalt(10);
            const hashedPassword = await hash(this.password, salt);

            this.password = hashedPassword;
          });
          return schema;
        },
      },
    ]),
    UserInfoModule,
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
