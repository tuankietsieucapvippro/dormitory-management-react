import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Taikhoan } from './entities/taikhoan.entity';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class TaikhoanService {
  constructor(
    @InjectRepository(Taikhoan)
    private taikhoanRepository: Repository<Taikhoan>,
  ) {}

  async login(loginDto: LoginDto) {
    try {
      console.log('Login attempt:', loginDto);
      
      const taikhoan = await this.taikhoanRepository.findOne({
        where: { 
          tendangnhap: loginDto.tendangnhap,
          matkhau: loginDto.matkhau
        }
      });
      console.log('Found account:', taikhoan);

      if (!taikhoan) {
        throw new UnauthorizedException('Tên đăng nhập hoặc mật khẩu không đúng');
      }

      const result = {
        id: taikhoan.taikhoanid,
        tendangnhap: taikhoan.tendangnhap,
        vaitro: taikhoan.vaitro,
      };
      console.log('Login result:', result);
      return result;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }
}
