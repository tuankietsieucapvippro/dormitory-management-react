import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiennuocService } from './diennuoc.service';
import { DiennuocController } from './diennuoc.controller';
import { Diennuoc } from './entities/diennuoc.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Diennuoc])],
  controllers: [DiennuocController],
  providers: [DiennuocService],
  exports: [DiennuocService],
})
export class DiennuocModule {}
