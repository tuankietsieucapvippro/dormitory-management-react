import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';

export class CreatePhongDto {
  @IsNotEmpty()
  @IsString()
  tenphong: string;

  @IsNotEmpty()
  @IsNumber()
  toanhaid: number;

  @IsOptional()
  @IsString()
  tinhtrang?: string;

  @IsOptional()
  @IsNumber()
  soluonggiuong?: number;

  @IsNotEmpty()
  @IsNumber()
  loaiphongid: number;
}
