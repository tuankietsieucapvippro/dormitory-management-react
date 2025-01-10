import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { LoaiphongService } from './loaiphong.service';
import { CreateLoaiphongDto } from './dto/create-loaiphong.dto';
import { UpdateLoaiphongDto } from './dto/update-loaiphong.dto';

@Controller('loaiphong')
export class LoaiphongController {
  constructor(private readonly loaiphongService: LoaiphongService) {}

  @Post()
  create(@Body() createLoaiphongDto: CreateLoaiphongDto) {
    return this.loaiphongService.create(createLoaiphongDto);
  }

  @Get()
  findAll() {
    return this.loaiphongService.findAll();
  }

  @Get('gioitinh/:gioitinh')
  findByGioiTinh(@Param('gioitinh') gioitinh: 'Nam' | 'Nữ') {
    return this.loaiphongService.findByGioiTinh(gioitinh);
  }

  @Get('dongia')
  findByDonGiaRange(
    @Query('min') min: string,
    @Query('max') max: string,
  ) {
    return this.loaiphongService.findByDonGiaRange(+min, +max);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.loaiphongService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLoaiphongDto: UpdateLoaiphongDto) {
    return this.loaiphongService.update(+id, updateLoaiphongDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.loaiphongService.remove(+id);
  }
}
