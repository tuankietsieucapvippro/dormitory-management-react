import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Dkphong } from "../../dkphong/entities/dkphong.entity";
import { Check } from "typeorm";

@Entity("sinhvien")
export class Sinhvien {
  @PrimaryGeneratedColumn({ name: "sinhvienid" })
  sinhvienid: number;

  @Column({ name: "hotensv", length: 70 })
  hotensv: string;

  @Column({ name: "mssv", length: 10, unique: true })
  mssv: string;

  @Column({ name: "lop", length: 30 })
  lop: string;

  @Column({ name: "gioitinh", length: 10 })
  @Check("gioitinh IN ('Nam', 'Nữ')")
  gioitinh: string;

  @Column({ name: "ngaysinh", type: "date" })
  @Check("ngaysinh <= CURRENT_DATE")
  ngaysinh: Date;

  @Column({ name: "noisinh", length: 100 })
  noisinh: string;

  @Column({ name: "diachi", length: 100 })
  diachi: string;

  @Column({ name: "email", length: 100, unique: true })
  email: string;

  @Column({ name: "sodienthoai", length: 10, unique: true })
  sodienthoai: string;

  @Column({ name: "socccd", length: 20 })
  socccd: string;

  @OneToMany(() => Dkphong, (dkphong) => dkphong.sinhvien)
  dkphongs: Dkphong[];
}
  