import { Controller, Post, Body } from '@nestjs/common';
import { TaikhoanService } from './taikhoan.service';
import { LoginDto } from './dto/login.dto';

@Controller('taikhoan')
export class TaikhoanController {
  constructor(private readonly taikhoanService: TaikhoanService) {}

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.taikhoanService.login(loginDto);
  }
}
