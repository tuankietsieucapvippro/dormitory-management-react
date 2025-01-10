import { IsNotEmpty, IsString, IsNumber, Length, Min, IsOptional } from 'class-validator';

export class CreateLoaiphongDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 30)
  tenloaiphong: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  dongia: number;

  @IsOptional()
  @IsString()
  @Length(1, 255)
  mota?: string;

  @IsNotEmpty()
  @IsString()
  gioitinh: 'Nam' | 'Nữ';
}
