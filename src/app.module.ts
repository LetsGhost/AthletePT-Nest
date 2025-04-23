import { Module, Logger } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'dotenv';
import { UserModule } from './user/user.module';
import { UserInfoModule } from './user-info/user-info.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/roles.guard';
import { ExercisePlanModule } from './exercise-plan/exercise-plan.module';
import { WarmupModule } from './warmup/warmup.module';
import { ProtocolModule } from './protocol/protocol.module';
config();

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGO_URI
        ? process.env.MONGO_URI
        : (Logger.error('MONGO_URI is not defined'), process.exit(1)),
    ),
    UserModule,
    UserInfoModule,
    AuthModule,
    ExercisePlanModule,
    WarmupModule,
    ProtocolModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
