import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AuditlogService } from './auditlog.service';
import { CreateAuditlogDto } from './dto/create-auditlog.dto';

@Controller('auditlog')
export class AuditlogController {
  constructor(private readonly auditlogService: AuditlogService) {}

  @Post()
  create(@Body() createAuditlogDto: CreateAuditlogDto) {
    return this.auditlogService.create(createAuditlogDto);
  }

  @Get()
  findAll() {
    return this.auditlogService.findAll();
  }

  @Get('user/:id')
  findByUser(@Param('id') id: string) {
    return this.auditlogService.findByUser(+id);
  }

  @Get('table/:name')
  findByTable(@Param('name') name: string) {
    return this.auditlogService.findByTable(name);
  }
} 