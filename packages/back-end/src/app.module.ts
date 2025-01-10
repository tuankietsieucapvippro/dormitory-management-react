import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhongModule } from './phong/phong.module';
import { DiennuocModule } from './diennuoc/diennuoc.module';
import { DkphongModule } from './dkphong/dkphong.module';
import { HoadonModule } from './hoadon/hoadon.module';
import { LoaiphongModule } from './loaiphong/loaiphong.module';
import { SinhvienModule } from './sinhvien/sinhvien.module';
import { TaikhoanModule } from './taikhoan/taikhoan.module';
import { ToanhaModule } from './toanha/toanha.module';
import { Dkphong } from './dkphong/entities/dkphong.entity';
import { Diennuoc } from './diennuoc/entities/diennuoc.entity';
import { Loaiphong } from './loaiphong/entities/loaiphong.entity';
import { Hoadon } from './hoadon/entities/hoadon.entity';
import { Sinhvien } from './sinhvien/entities/sinhvien.entity';
import { Phong } from './phong/entities/phong.entity';
import { Toanha } from './toanha/entities/toanha.entity';
import { Taikhoan } from './taikhoan/entities/taikhoan.entity';
import { DksinhvienModule } from './dksinhvien/dksinhvien.module';
import { Dksinhvien } from './dksinhvien/entities/dksinhvien.entity';
import { AuditlogModule } from './auditlog/auditlog.module';
import { Auditlog } from './auditlog/entities/auditlog.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',  
      password: '1234',  
      database: 'dormitory_data', 
      entities: [Diennuoc, Dkphong, Hoadon, Loaiphong, Phong, Sinhvien, Taikhoan, Toanha, Dksinhvien, Auditlog],
      synchronize: false,
    }),
    PhongModule,
    DiennuocModule,
    DkphongModule,
    HoadonModule,
    LoaiphongModule,
    SinhvienModule,
    TaikhoanModule,
    ToanhaModule,
    DksinhvienModule,
    AuditlogModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
  