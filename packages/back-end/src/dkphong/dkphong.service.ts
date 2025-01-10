import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dkphong } from './entities/dkphong.entity';
import { CreateDkphongDto } from './dto/create-dkphong.dto';
import { UpdateDkphongDto } from './dto/update-dkphong.dto';

@Injectable()
export class DkphongService {
  constructor(
    @InjectRepository(Dkphong)
    private dkphongRepository: Repository<Dkphong>,
  ) {}

  async create(createDkphongDto: CreateDkphongDto): Promise<Dkphong> {
    // Kiểm tra xem sinh viên đã đăng ký phòng nào chưa
    const existingRegistration = await this.dkphongRepository.findOne({
      where: {
        sinhvien: { sinhvienid: createDkphongDto.sinhvienid },
        ngaytra: null, // Chưa trả phòng
      },
    });

    if (existingRegistration) {
      throw new BadRequestException('Sinh viên đã đăng ký phòng và chưa trả phòng');
    }

    const dkphong = this.dkphongRepository.create({
      ...createDkphongDto,
      ngaydk: new Date().toISOString().split('T')[0], // Lấy ngày hiện tại
    });

    return await this.dkphongRepository.save(dkphong);
  }

  async findAll(): Promise<Dkphong[]> {
    return await this.dkphongRepository.find({
      relations: ['phong', 'sinhvien'],
    });
  }

  async findOne(id: number): Promise<Dkphong> {
    const dkphong = await this.dkphongRepository.findOne({
      where: { dkphongid: id },
      relations: ['phong', 'sinhvien'],
    });

    if (!dkphong) {
      throw new NotFoundException(`Không tìm thấy đăng ký phòng với ID ${id}`);
    }

    return dkphong;
  }

  async update(id: number, updateDkphongDto: UpdateDkphongDto): Promise<Dkphong> {
    const dkphong = await this.findOne(id);
    Object.assign(dkphong, updateDkphongDto);
    return await this.dkphongRepository.save(dkphong);
  }

  async remove(id: number): Promise<void> {
    const dkphong = await this.findOne(id);
    await this.dkphongRepository.remove(dkphong);
  }

  async findBySinhvien(sinhvienId: number): Promise<Dkphong[]> {
    return await this.dkphongRepository.find({
      where: { sinhvien: { sinhvienid: sinhvienId } },
      relations: ['phong'],
    });
  }

  async findByPhong(phongId: number): Promise<Dkphong[]> {
    return await this.dkphongRepository.find({
      where: { phong: { phongid: phongId } },
      relations: ['sinhvien'],
    });
  }

  async traPhong(id: number): Promise<Dkphong> {
    const dkphong = await this.findOne(id);
    if (dkphong.ngaytra) {
      throw new BadRequestException('Phòng này đã được trả trước đó');
    }
    
    const today = new Date();
    dkphong.ngaytra = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return await this.dkphongRepository.save(dkphong);
  }
}
