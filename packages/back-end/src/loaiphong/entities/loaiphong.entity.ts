import { Check, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Phong } from "../../phong/entities/phong.entity";

@Entity("loaiphong")
export class Loaiphong {
  @PrimaryGeneratedColumn({ name: "loaiphongid" })
  loaiphongid: number;

  @Column({ name: "tenloaiphong", length: 30 })
  tenloaiphong: string;

  @Column({ name: "dongia", type: "float" })
  @Check('dongia >= 0')
  dongia: number;

  @Column({ name: "mota", length: 255, nullable: true })
  mota: string;

  @Column({ name: "gioitinh", length: 10 })
  @Check("gioitinh IN ('Nam', 'Nữ')")
  gioitinh: string;

  @OneToMany(() => Phong, (phong) => phong.loaiphong)
  phongs: Phong[];
}
  