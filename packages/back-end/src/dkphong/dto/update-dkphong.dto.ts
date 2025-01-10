import { PartialType } from '@nestjs/mapped-types';
import { CreateDkphongDto } from './create-dkphong.dto';

export class UpdateDkphongDto extends PartialType(CreateDkphongDto) {}
