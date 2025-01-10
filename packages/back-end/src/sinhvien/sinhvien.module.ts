import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SinhvienService } from './sinhvien.service';
import { SinhvienController } from './sinhvien.controller';
import { Sinhvien } from './entities/sinhvien.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sinhvien])],
  controllers: [SinhvienController],
  providers: [SinhvienService],
})
export class SinhvienModule {}
