import { IsNotEmpty, IsString, Length, IsOptional } from 'class-validator';

export class CreateToanhaDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 30)
  tentoanha: string;

  @IsOptional()
  @IsString()
  @Length(1, 255)
  mota?: string;
}
