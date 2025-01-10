import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Toanha } from './entities/toanha.entity';
import { CreateToanhaDto } from './dto/create-toanha.dto';
import { UpdateToanhaDto } from './dto/update-toanha.dto';

@Injectable()
export class ToanhaService {
  constructor(
    @InjectRepository(Toanha)
    private toanhaRepository: Repository<Toanha>,
  ) {}

  async create(createToanhaDto: CreateToanhaDto): Promise<Toanha> {
    // Kiểm tra tên tòa nhà đã tồn tại chưa
    const existingToanha = await this.toanhaRepository.findOne({
      where: { tentoanha: createToanhaDto.tentoanha }
    });
    if (existingToanha) {
      throw new Error('Tên tòa nhà đã tồn tại');
    }

    const toanha = this.toanhaRepository.create(createToanhaDto);
    return await this.toanhaRepository.save(toanha);
  }

  async findAll(): Promise<Toanha[]> {
    return await this.toanhaRepository.find({
      relations: ['phongs'],
    });
  }

  async findOne(id: number): Promise<Toanha> {
    const toanha = await this.toanhaRepository.findOne({
      where: { toanhaid: id },
      relations: ['phongs'],
    });

    if (!toanha) {
      throw new NotFoundException(`Không tìm thấy tòa nhà với ID ${id}`);
    }

    return toanha;
  }

  async update(id: number, updateToanhaDto: UpdateToanhaDto): Promise<Toanha> {
    const toanha = await this.findOne(id);
    
    // Nếu cập nhật tên tòa nhà, kiểm tra tên mới đã tồn tại chưa
    if (updateToanhaDto.tentoanha && updateToanhaDto.tentoanha !== toanha.tentoanha) {
      const existingToanha = await this.toanhaRepository.findOne({
        where: { tentoanha: updateToanhaDto.tentoanha }
      });
      if (existingToanha) {
        throw new Error('Tên tòa nhà đã tồn tại');
      }
    }

    Object.assign(toanha, updateToanhaDto);
    return await this.toanhaRepository.save(toanha);
  }

  async remove(id: number): Promise<void> {
    const toanha = await this.findOne(id);
    await this.toanhaRepository.remove(toanha);
  }

  async findByName(tentoanha: string): Promise<Toanha> {
    const toanha = await this.toanhaRepository.findOne({
      where: { tentoanha },
      relations: ['phongs'],
    });

    if (!toanha) {
      throw new NotFoundException(`Không tìm thấy tòa nhà với tên ${tentoanha}`);
    }

    return toanha;
  }
}
