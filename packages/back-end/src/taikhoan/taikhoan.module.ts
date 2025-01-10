import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaikhoanService } from './taikhoan.service';
import { TaikhoanController } from './taikhoan.controller';
import { Taikhoan } from './entities/taikhoan.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Taikhoan])],
  controllers: [TaikhoanController],
  providers: [TaikhoanService],
})
export class TaikhoanModule {}
