import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DkphongService } from './dkphong.service';
import { DkphongController } from './dkphong.controller';
import { Dkphong } from './entities/dkphong.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Dkphong])],
  controllers: [DkphongController],
  providers: [DkphongService],
  exports: [DkphongService],
})
export class DkphongModule {}
