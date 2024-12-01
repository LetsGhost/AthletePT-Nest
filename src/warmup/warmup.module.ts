import { Module } from '@nestjs/common';
import { WarmupService } from './warmup.service';

@Module({
  providers: [WarmupService],
})
export class WarmupModule {}
