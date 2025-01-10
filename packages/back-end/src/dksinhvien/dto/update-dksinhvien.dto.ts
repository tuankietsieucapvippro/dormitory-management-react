import { PartialType } from '@nestjs/mapped-types';
import { CreateDksinhvienDto } from './create-dksinhvien.dto';

export class UpdateDksinhvienDto extends PartialType(CreateDksinhvienDto) {} 