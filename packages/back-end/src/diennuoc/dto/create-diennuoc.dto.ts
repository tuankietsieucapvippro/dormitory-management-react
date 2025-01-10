import { IsNotEmpty, IsNumber, IsDateString, Min } from 'class-validator';

export class CreateDiennuocDto {
  @IsNotEmpty()
  @IsNumber()
  phongid: number;

  @IsNotEmpty()
  @IsDateString()
  tungay: string;

  @IsNotEmpty()
  @IsDateString()
  denngay: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  chisodiencu: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  chisodienmoi: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  chisonuoccu: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  chisonuocmoi: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  dongiadien: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  dongianuoc: number;
}
