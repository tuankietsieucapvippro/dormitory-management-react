import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { DksinhvienService } from './dksinhvien.service';
import { CreateDksinhvienDto } from './dto/create-dksinhvien.dto';
import { UpdateDksinhvienDto } from './dto/update-dksinhvien.dto';

@Controller('dksinhvien')
export class DksinhvienController {
  constructor(private readonly dksinhvienService: DksinhvienService) {}

  @Post()
  async create(@Body() createDksinhvienDto: CreateDksinhvienDto) {
    try {
      return await this.dksinhvienService.create(createDksinhvienDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.dksinhvienService.findAll();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.dksinhvienService.findOne(+id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDksinhvienDto: UpdateDksinhvienDto) {
    try {
      return await this.dksinhvienService.update(+id, updateDksinhvienDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.dksinhvienService.remove(+id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
} 