import { IsNotEmpty, IsString, IsEmail, Length, IsOptional, IsDateString } from 'class-validator';

export class CreateSinhvienDto {
  @IsNotEmpty()
  @IsString()
  mssv: string;

  @IsNotEmpty()
  @IsString()
  hotensv: string;

  @IsString()
  @IsOptional()
  lop?: string;

  @IsNotEmpty()
  @IsString()
  gioitinh: string;

  @IsNotEmpty()
  @IsDateString()
  ngaysinh: Date;

  @IsString()
  @IsOptional()
  noisinh?: string;

  @IsString()
  @IsOptional()
  diachi?: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(10, 10)
  sodienthoai: string;

  @IsString()
  @IsOptional()
  socccd?: string;
}
