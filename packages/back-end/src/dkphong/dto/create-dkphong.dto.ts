import { IsNotEmpty, IsNumber, IsOptional, IsDateString } from 'class-validator';

export class CreateDkphongDto {
  @IsNotEmpty()
  @IsNumber()
  sinhvienid: number;

  @IsNotEmpty()
  @IsNumber()
  phongid: number;

  @IsOptional()
  @IsDateString()
  ngaydk?: string;

  @IsOptional()
  @IsDateString()
  ngaytra?: string;
}
