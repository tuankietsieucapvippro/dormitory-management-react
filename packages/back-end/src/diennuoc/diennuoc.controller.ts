import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DiennuocService } from './diennuoc.service';
import { CreateDiennuocDto } from './dto/create-diennuoc.dto';
import { UpdateDiennuocDto } from './dto/update-diennuoc.dto';

@Controller('diennuoc')
export class DiennuocController {
  constructor(private readonly diennuocService: DiennuocService) {}

  @Post()
  create(@Body() createDiennuocDto: CreateDiennuocDto) {
    return this.diennuocService.create(createDiennuocDto);
  }

  @Get()
  findAll() {
    return this.diennuocService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.diennuocService.findOne(+id);
  }

  @Get('phong/:id')
  findByPhong(@Param('id') id: string) {
    return this.diennuocService.findByPhong(+id);
  }

  @Get(':id/tinhtien')
  tinhTongTien(@Param('id') id: string) {
    return this.diennuocService.tinhTongTien(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDiennuocDto: UpdateDiennuocDto) {
    return this.diennuocService.update(+id, updateDiennuocDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.diennuocService.remove(+id);
  }
}
