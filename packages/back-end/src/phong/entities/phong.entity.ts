import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import { Loaiphong } from "../../loaiphong/entities/loaiphong.entity";
import { Toanha } from "../../toanha/entities/toanha.entity";
import { Diennuoc } from "../../diennuoc/entities/diennuoc.entity";
import { Dkphong } from "../../dkphong/entities/dkphong.entity";
import { Hoadon } from "../../hoadon/entities/hoadon.entity";

@Entity("phong")
export class Phong {
  @PrimaryGeneratedColumn({ name: "phongid" })
  phongid: number;

  @Column({ name: "tenphong", length: 30 })
  tenphong: string;

  @Column({ name: "tinhtrang", length: 30 })
  tinhtrang: string;

  @Column({ name: "soluonggiuong", type: "int" })
  soluonggiuong: number;

  @ManyToOne(() => Loaiphong, (loaiphong) => loaiphong.phongs)
  @JoinColumn({ name: "loaiphongid" })
  loaiphong: Loaiphong;

  @ManyToOne(() => Toanha, (toanha) => toanha.phongs)
  @JoinColumn({ name: "toanhaid" })
  toanha: Toanha;

  @OneToMany(() => Diennuoc, (diennuoc) => diennuoc.phong)
  diennuocs: Diennuoc[];

  @OneToMany(() => Dkphong, (dkphong) => dkphong.phong)
  dkphongs: Dkphong[];

  @OneToMany(() => Hoadon, (hoadon) => hoadon.phong)
  hoadons: Hoadon[];
}
  