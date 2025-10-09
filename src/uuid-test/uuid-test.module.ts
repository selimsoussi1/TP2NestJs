import { Module } from '@nestjs/common';
import { CommonModule } from '../common/common.module';
import { UuidService } from '../common/uuid/uuid.service';

@Module({
  imports: [CommonModule],
  providers: [UuidService],
})
export class UuidTestModule {}
