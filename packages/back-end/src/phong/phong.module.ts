import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhongService } from './phong.service';
import { PhongController } from './phong.controller';
import { Phong } from './entities/phong.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Phong])],
  controllers: [PhongController],
  providers: [PhongService],
  exports: [PhongService],
})
export class PhongModule {}
