import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Phong } from './entities/phong.entity';
import { CreatePhongDto } from './dto/create-phong.dto';
import { UpdatePhongDto } from './dto/update-phong.dto';

@Injectable()
export class PhongService {
  constructor(
    @InjectRepository(Phong)
    private phongRepository: Repository<Phong>,
  ) {}

  async create(createPhongDto: CreatePhongDto): Promise<Phong> {
    const phong = this.phongRepository.create(createPhongDto);
    return await this.phongRepository.save(phong);
  }

  async findAll(): Promise<Phong[]> {
    return await this.phongRepository.find({
      relations: ['toanha', 'loaiphong', 'diennuocs', 'dkphongs', 'hoadons'],
    });
  }

  async findOne(id: number): Promise<Phong> {
    const phong = await this.phongRepository.findOne({
      where: { phongid: id },
      relations: ['toanha', 'loaiphong', 'diennuocs', 'dkphongs', 'hoadons'],
    });
    if (!phong) {
      throw new NotFoundException(`Không tìm thấy phòng với ID ${id}`);
    }
    return phong;
  }

  async update(id: number, updatePhongDto: UpdatePhongDto): Promise<Phong> {
    const phong = await this.findOne(id);
    Object.assign(phong, updatePhongDto);
    return await this.phongRepository.save(phong);
  }

  async remove(id: number): Promise<void> {
    const phong = await this.findOne(id);
    await this.phongRepository.remove(phong);
  }

  async findByToanha(toanhaId: number): Promise<Phong[]> {
    return await this.phongRepository.find({
      where: { toanha: { toanhaid: toanhaId } },
      relations: ['loaiphong'],
    });
  }

  async findAvailable(): Promise<Phong[]> {
    return await this.phongRepository.find({
      where: { tinhtrang: 'Trống' },
      relations: ['toanha', 'loaiphong'],
    });
  }
}
