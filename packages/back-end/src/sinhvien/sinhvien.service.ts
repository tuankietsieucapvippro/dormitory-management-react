import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSinhvienDto } from './dto/create-sinhvien.dto';
import { UpdateSinhvienDto } from './dto/update-sinhvien.dto';
import { Sinhvien } from './entities/sinhvien.entity';

@Injectable()
export class SinhvienService {
  constructor(
    @InjectRepository(Sinhvien)
    private readonly sinhvienRepository: Repository<Sinhvien>,
  ) {}

  async findAll() {
    try {
      const sinhviens = await this.sinhvienRepository
        .createQueryBuilder('sinhvien')
        .leftJoinAndSelect('sinhvien.dkphongs', 'dkphong')
        .leftJoinAndSelect('dkphong.phong', 'phong')
        .leftJoinAndSelect('phong.toanha', 'toanha')
        .getMany();
      
      return sinhviens;
    } catch (error) {
      console.error('Error in findAll:', error);
      throw new InternalServerErrorException('Lỗi khi lấy danh sách sinh viên');
    }
  }

  async findOne(id: number) {
    try {
      const sinhvien = await this.sinhvienRepository
        .createQueryBuilder('sinhvien')
        .leftJoinAndSelect('sinhvien.dkphongs', 'dkphong')
        .leftJoinAndSelect('dkphong.phong', 'phong')
        .leftJoinAndSelect('phong.toanha', 'toanha')
        .where('sinhvien.sinhvienid = :id', { id })
        .getOne();

      return sinhvien;
    } catch (error) {
      console.error('Error in findOne:', error);
      throw new InternalServerErrorException('Lỗi khi lấy thông tin sinh viên');
    }
  }

  async create(createSinhvienDto: CreateSinhvienDto) {
    try {
      const sinhvien = this.sinhvienRepository.create(createSinhvienDto);
      return await this.sinhvienRepository.save(sinhvien);
    } catch (error) {
      console.error('Error in create:', error);
      throw new InternalServerErrorException('Lỗi khi tạo sinh viên');
    }
  }

  async update(id: number, updateSinhvienDto: UpdateSinhvienDto) {
    try {
      return await this.sinhvienRepository.update(id, updateSinhvienDto);
    } catch (error) {
      console.error('Error in update:', error);
      throw new InternalServerErrorException('Lỗi khi cập nhật sinh viên');
    }
  }

  async remove(id: number) {
    try {
      return await this.sinhvienRepository.delete(id);
    } catch (error) {
      console.error('Error in remove:', error);
      throw new InternalServerErrorException('Lỗi khi xóa sinh viên');
    }
  }
}
