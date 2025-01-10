import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HoadonService } from './hoadon.service';
import { HoadonController } from './hoadon.controller';
import { Hoadon } from './entities/hoadon.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Hoadon])],
  controllers: [HoadonController],
  providers: [HoadonService],
  exports: [HoadonService],
})
export class HoadonModule {}
