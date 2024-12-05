import { Module } from '@nestjs/common';
import { ProtocolService } from './protocol.service';
import { ProtocolController } from './protocol.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProtocolSchema } from './protocol.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Protocol', schema: ProtocolSchema }]),
  ],
  providers: [ProtocolService],
  controllers: [ProtocolController],
})
export class ProtocolModule {}
