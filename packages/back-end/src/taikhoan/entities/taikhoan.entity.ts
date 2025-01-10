import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("taikhoan")
export class Taikhoan {
  @PrimaryGeneratedColumn({ name: "taikhoanid" })
  taikhoanid: number;

  @Column({ name: "tendangnhap", length: 20, unique: true })
  tendangnhap: string;

  @Column({ name: "matkhau", length: 255 })
  matkhau: string;

  @Column({ name: "vaitro", length: 50 })
  vaitro: string;
}
  