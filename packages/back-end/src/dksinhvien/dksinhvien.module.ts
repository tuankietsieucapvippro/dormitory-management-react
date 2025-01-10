import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DksinhvienService } from './dksinhvien.service';
import { DksinhvienController } from './dksinhvien.controller';
import { Dksinhvien } from './entities/dksinhvien.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Dksinhvien])],
  controllers: [DksinhvienController],
  providers: [DksinhvienService],
})
export class DksinhvienModule {} 