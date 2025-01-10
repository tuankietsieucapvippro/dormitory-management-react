import { IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 20)
  tendangnhap: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  matkhau: string;
} 