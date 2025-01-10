import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditlogService } from './auditlog.service';
import { AuditlogController } from './auditlog.controller';
import { Auditlog } from './entities/auditlog.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Auditlog])],
  controllers: [AuditlogController],
  providers: [AuditlogService],
  exports: [AuditlogService],
})
export class AuditlogModule {} 