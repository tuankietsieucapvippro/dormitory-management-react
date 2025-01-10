import { PartialType } from '@nestjs/mapped-types';
import { CreateSinhvienDto } from './create-sinhvien.dto';

export class UpdateSinhvienDto extends PartialType(CreateSinhvienDto) {}
