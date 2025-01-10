import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDksinhvienDto } from './dto/create-dksinhvien.dto';
import { UpdateDksinhvienDto } from './dto/update-dksinhvien.dto';
import { Dksinhvien } from './entities/dksinhvien.entity';

@Injectable()
export class DksinhvienService {
  constructor(
    @InjectRepository(Dksinhvien)
    private readonly dksinhvienRepository: Repository<Dksinhvien>,
  ) {}

  async create(createDksinhvienDto: CreateDksinhvienDto) {
    try {
      const dksinhvien = this.dksinhvienRepository.create(createDksinhvienDto);
      return await this.dksinhvienRepository.save(dksinhvien);
    } catch (error) {
      console.error('Error in create:', error);
      throw new InternalServerErrorException('Lỗi khi tạo đăng ký sinh viên');
    }
  }

  async findAll() {
    try {
      return await this.dksinhvienRepository.find();
    } catch (error) {
      console.error('Error in findAll:', error);
      throw new InternalServerErrorException('Lỗi khi lấy danh sách đăng ký sinh viên');
    }
  }

  async findOne(id: number) {
    try {
      return await this.dksinhvienRepository.findOneBy({ dksinhvienid: id });
    } catch (error) {
      console.error('Error in findOne:', error);
      throw new InternalServerErrorException('Lỗi khi lấy thông tin đăng ký sinh viên');
    }
  }

  async update(id: number, updateDksinhvienDto: UpdateDksinhvienDto) {
    try {
      return await this.dksinhvienRepository.update(id, updateDksinhvienDto);
    } catch (error) {
      console.error('Error in update:', error);
      throw new InternalServerErrorException('Lỗi khi cập nhật đăng ký sinh viên');
    }
  }

  async remove(id: number) {
    try {
      return await this.dksinhvienRepository.delete(id);
    } catch (error) {
      console.error('Error in remove:', error);
      throw new InternalServerErrorException('Lỗi khi xóa đăng ký sinh viên');
    }
  }
} 