import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { Loaiphong } from './entities/loaiphong.entity';
import { CreateLoaiphongDto } from './dto/create-loaiphong.dto';
import { UpdateLoaiphongDto } from './dto/update-loaiphong.dto';

@Injectable()
export class LoaiphongService {
  constructor(
    @InjectRepository(Loaiphong)
    private loaiphongRepository: Repository<Loaiphong>,
  ) {}

  async create(createLoaiphongDto: CreateLoaiphongDto): Promise<Loaiphong> {
    const loaiphong = this.loaiphongRepository.create(createLoaiphongDto);
    return await this.loaiphongRepository.save(loaiphong);
  }

  async findAll(): Promise<Loaiphong[]> {
    return await this.loaiphongRepository.find({
      relations: {
        phongs: true
      }
    });
  }

  async findOne(id: number): Promise<Loaiphong> {
    const loaiphong = await this.loaiphongRepository.findOne({
      where: { loaiphongid: id },
      relations: ['phongs'],
    });

    if (!loaiphong) {
      throw new NotFoundException(`Không tìm thấy loại phòng với ID ${id}`);
    }

    return loaiphong;
  }

  async update(id: number, updateLoaiphongDto: UpdateLoaiphongDto): Promise<Loaiphong> {
    const loaiphong = await this.findOne(id);
    Object.assign(loaiphong, updateLoaiphongDto);
    return await this.loaiphongRepository.save(loaiphong);
  }

  async remove(id: number): Promise<void> {
    const loaiphong = await this.findOne(id);
    await this.loaiphongRepository.remove(loaiphong);
  }

  async findByGioiTinh(gioitinh: 'Nam' | 'Nữ'): Promise<Loaiphong[]> {
    return await this.loaiphongRepository.find({
      where: { gioitinh },
      relations: ['phongs'],
    });
  }

  async findByDonGiaRange(min: number, max: number): Promise<Loaiphong[]> {
    return await this.loaiphongRepository.find({
      where: {
        dongia: Between(min, max),
      },
      relations: ['phongs'],
    });
  }
}
