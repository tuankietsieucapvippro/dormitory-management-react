import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HoadonService } from './hoadon.service';
import { CreateHoadonDto } from './dto/create-hoadon.dto';
import { UpdateHoadonDto } from './dto/update-hoadon.dto';

@Controller('hoadon')
export class HoadonController {
  constructor(private readonly hoadonService: HoadonService) {}

  @Post()
  create(@Body() createHoadonDto: CreateHoadonDto) {
    return this.hoadonService.create(createHoadonDto);
  }

  @Get()
  findAll() {
    return this.hoadonService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hoadonService.findOne(+id);
  }

  @Get('phong/:id')
  findByPhong(@Param('id') id: string) {
    return this.hoadonService.findByPhong(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHoadonDto: UpdateHoadonDto) {
    return this.hoadonService.update(+id, updateHoadonDto);
  }

  @Patch(':id/tinhtrang')
  updateTinhTrang(
    @Param('id') id: string,
    @Body('tinhtrang') tinhtrang: string,
  ) {
    return this.hoadonService.updateTinhTrang(+id, tinhtrang);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hoadonService.remove(+id);
  }
}
