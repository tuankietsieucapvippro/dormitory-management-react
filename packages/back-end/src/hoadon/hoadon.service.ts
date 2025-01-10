import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hoadon } from './entities/hoadon.entity';
import { CreateHoadonDto } from './dto/create-hoadon.dto';
import { UpdateHoadonDto } from './dto/update-hoadon.dto';

@Injectable()
export class HoadonService {
  constructor(
    @InjectRepository(Hoadon)
    private hoadonRepository: Repository<Hoadon>,
  ) {}

  async create(createHoadonDto: CreateHoadonDto): Promise<Hoadon> {
    const hoadon = this.hoadonRepository.create({
      ...createHoadonDto,
      ngaylaphd: new Date().toISOString().split('T')[0], // Ngày hiện tại
    });
    return await this.hoadonRepository.save(hoadon);
  }

  async findAll(): Promise<Hoadon[]> {
    return await this.hoadonRepository.find({
      relations: ['phong', 'diennuoc'],
    });
  }

  async findOne(id: number): Promise<Hoadon> {
    const hoadon = await this.hoadonRepository.findOne({
      where: { hoadonid: id },
      relations: ['phong', 'diennuoc'],
    });

    if (!hoadon) {
      throw new NotFoundException(`Không tìm thấy hóa đơn với ID ${id}`);
    }

    return hoadon;
  }

  async update(id: number, updateHoadonDto: UpdateHoadonDto): Promise<Hoadon> {
    const hoadon = await this.findOne(id);
    Object.assign(hoadon, updateHoadonDto);
    return await this.hoadonRepository.save(hoadon);
  }

  async remove(id: number): Promise<void> {
    const hoadon = await this.findOne(id);
    await this.hoadonRepository.remove(hoadon);
  }

  async findByPhong(phongId: number): Promise<Hoadon[]> {
    return await this.hoadonRepository.find({
      where: { phong: { phongid: phongId } },
      relations: ['diennuoc'],
      order: { ngaylaphd: 'DESC' },
    });
  }

  async updateTinhTrang(id: number, tinhtrang: string): Promise<Hoadon> {
    const hoadon = await this.findOne(id);
    hoadon.tinhtrang = tinhtrang;
    return await this.hoadonRepository.save(hoadon);
  }
}
