import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DkphongService } from './dkphong.service';
import { CreateDkphongDto } from './dto/create-dkphong.dto';
import { UpdateDkphongDto } from './dto/update-dkphong.dto';

@Controller('dkphong')
export class DkphongController {
  constructor(private readonly dkphongService: DkphongService) {}

  @Post()
  create(@Body() createDkphongDto: CreateDkphongDto) {
    return this.dkphongService.create(createDkphongDto);
  }

  @Get()
  findAll() {
    return this.dkphongService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dkphongService.findOne(+id);
  }

  @Get('sinhvien/:id')
  findBySinhvien(@Param('id') id: string) {
    return this.dkphongService.findBySinhvien(+id);
  }

  @Get('phong/:id')
  findByPhong(@Param('id') id: string) {
    return this.dkphongService.findByPhong(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDkphongDto: UpdateDkphongDto) {
    return this.dkphongService.update(+id, updateDkphongDto);
  }

  @Patch(':id/traphong')
  traPhong(@Param('id') id: string) {
    return this.dkphongService.traPhong(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dkphongService.remove(+id);
  }
}
