import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { SinhvienService } from './sinhvien.service';
import { CreateSinhvienDto } from './dto/create-sinhvien.dto';
import { UpdateSinhvienDto } from './dto/update-sinhvien.dto';

@Controller('sinhvien')
export class SinhvienController {
  constructor(private readonly sinhvienService: SinhvienService) {}

  @Get()
  async findAll() {
    try {
      return await this.sinhvienService.findAll();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.sinhvienService.findOne(+id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  async create(@Body() createSinhvienDto: CreateSinhvienDto) {
    try {
      return await this.sinhvienService.create(createSinhvienDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateSinhvienDto: UpdateSinhvienDto) {
    try {
      return await this.sinhvienService.update(+id, updateSinhvienDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.sinhvienService.remove(+id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
