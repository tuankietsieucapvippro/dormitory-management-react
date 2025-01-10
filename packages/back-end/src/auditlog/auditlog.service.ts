import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auditlog } from './entities/auditlog.entity';
import { CreateAuditlogDto } from './dto/create-auditlog.dto';

@Injectable()
export class AuditlogService {
  constructor(
    @InjectRepository(Auditlog)
    private auditlogRepository: Repository<Auditlog>,
  ) {}

  async create(createAuditlogDto: CreateAuditlogDto): Promise<Auditlog> {
    const auditlog = this.auditlogRepository.create(createAuditlogDto);
    return await this.auditlogRepository.save(auditlog);
  }

  async findAll(): Promise<Auditlog[]> {
    return await this.auditlogRepository.find({
      relations: ['user'],
      order: { actiondate: 'DESC' },
    });
  }

  async findByUser(userId: number): Promise<Auditlog[]> {
    return await this.auditlogRepository.find({
      where: { user: { taikhoanid: userId } },
      relations: ['user'],
      order: { actiondate: 'DESC' },
    });
  }

  async findByTable(tableName: string): Promise<Auditlog[]> {
    return await this.auditlogRepository.find({
      where: { tablename: tableName },
      relations: ['user'],
      order: { actiondate: 'DESC' },
    });
  }
} 