import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoaiphongService } from './loaiphong.service';
import { LoaiphongController } from './loaiphong.controller';
import { Loaiphong } from './entities/loaiphong.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Loaiphong])],
  controllers: [LoaiphongController],
  providers: [LoaiphongService],
  exports: [LoaiphongService],
})
export class LoaiphongModule {}
