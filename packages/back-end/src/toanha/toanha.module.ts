import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToanhaService } from './toanha.service';
import { ToanhaController } from './toanha.controller';
import { Toanha } from './entities/toanha.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Toanha])],
  controllers: [ToanhaController],
  providers: [ToanhaService],
  exports: [ToanhaService],
})
export class ToanhaModule {}
