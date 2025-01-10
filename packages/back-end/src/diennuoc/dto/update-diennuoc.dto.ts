import { PartialType } from '@nestjs/mapped-types';
import { CreateDiennuocDto } from './create-diennuoc.dto';

export class UpdateDiennuocDto extends PartialType(CreateDiennuocDto) {}
