import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Diennuoc } from './entities/diennuoc.entity';
import { CreateDiennuocDto } from './dto/create-diennuoc.dto';
import { UpdateDiennuocDto } from './dto/update-diennuoc.dto';

@Injectable()
export class DiennuocService {
  constructor(
    @InjectRepository(Diennuoc)
    private diennuocRepository: Repository<Diennuoc>,
  ) {}

  async create(createDiennuocDto: CreateDiennuocDto): Promise<Diennuoc> {
    const diennuoc = this.diennuocRepository.create(createDiennuocDto);
    return await this.diennuocRepository.save(diennuoc);
  }

  async findAll(): Promise<Diennuoc[]> {
    return await this.diennuocRepository.find({
      relations: ['phong', 'hoadons'],
    });
  }

  async findOne(id: number): Promise<Diennuoc> {
    const diennuoc = await this.diennuocRepository.findOne({
      where: { diennuocid: id },
      relations: ['phong', 'hoadons'],
    });

    if (!diennuoc) {
      throw new NotFoundException(`Không tìm thấy chỉ số điện nước với ID ${id}`);
    }

    return diennuoc;
  }

  async update(id: number, updateDiennuocDto: UpdateDiennuocDto): Promise<Diennuoc> {
    const diennuoc = await this.findOne(id);
    Object.assign(diennuoc, updateDiennuocDto);
    return await this.diennuocRepository.save(diennuoc);
  }

  async remove(id: number): Promise<void> {
    const diennuoc = await this.findOne(id);
    await this.diennuocRepository.remove(diennuoc);
  }

  async findByPhong(phongId: number): Promise<Diennuoc[]> {
    return await this.diennuocRepository.find({
      where: { phong: { phongid: phongId } },
      order: { tungay: 'DESC' },
    });
  }

  async tinhTienDien(diennuocId: number): Promise<number> {
    const diennuoc = await this.findOne(diennuocId);
    const soDien = diennuoc.chisodienmoi - diennuoc.chisodiencu;
    return soDien * diennuoc.dongiadien;
  }

  async tinhTienNuoc(diennuocId: number): Promise<number> {
    const diennuoc = await this.findOne(diennuocId);
    const soNuoc = diennuoc.chisonuocmoi - diennuoc.chisonuoccu;
    return soNuoc * diennuoc.dongianuoc;
  }

  async tinhTongTien(diennuocId: number): Promise<{tienDien: number; tienNuoc: number; tongTien: number}> {
    const tienDien = await this.tinhTienDien(diennuocId);
    const tienNuoc = await this.tinhTienNuoc(diennuocId);
    return {
      tienDien,
      tienNuoc,
      tongTien: tienDien + tienNuoc,
    };
  }
}
