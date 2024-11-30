import { Module, Logger } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'dotenv';
config();

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGO_URI
        ? process.env.MONGO_URI
        : (Logger.error('MONGO_URI is not defined'), process.exit(1)),
    ),
  ],
})
export class AppModule {}
