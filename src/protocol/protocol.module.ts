import { Module } from '@nestjs/common';
import { ProtocolService } from './protocol.service';
import { ProtocolController } from './protocol.controller';

@Module({
  providers: [ProtocolService],
  controllers: [ProtocolController]
})
export class ProtocolModule {}
