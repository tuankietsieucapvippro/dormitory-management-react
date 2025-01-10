import { IsNotEmpty, IsNumber, IsString, IsDateString } from 'class-validator';

export class CreateHoadonDto {
  @IsNotEmpty()
  @IsNumber()
  phongid: number;

  @IsNotEmpty()
  @IsNumber()
  diennuocid: number;

  @IsNotEmpty()
  @IsDateString()
  ngaylaphd: string;

  @IsNotEmpty()
  @IsString()
  tinhtrang: string;
}
