import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import { Phong } from "../../phong/entities/phong.entity";
import { Hoadon } from "../../hoadon/entities/hoadon.entity";
import { Check } from "typeorm";

@Entity("diennuoc")
export class Diennuoc {
  @PrimaryGeneratedColumn({ name: "diennuocid" })
  diennuocid: number;

  @ManyToOne(() => Phong, (phong) => phong.diennuocs)
  @JoinColumn({ name: "phongid" })
  phong: Phong;

  @Column({ name: "tungay", type: "date" })
  tungay: Date;

  @Column({ name: "denngay", type: "date" })
  denngay: Date;

  @Column({ name: "chisodiencu", type: "int" })
  chisodiencu: number;

  @Column({ name: "chisodienmoi", type: "int" })
  @Check('chisodienmoi >= chisodiencu')
  chisodienmoi: number;

  @Column({ name: "chisonuoccu", type: "int" })
  chisonuoccu: number;

  @Column({ name: "chisonuocmoi", type: "int" })
  @Check('chisonuocmoi >= chisonuoccu')
  chisonuocmoi: number;

  @Column({ name: "dongiadien", type: "float" })
  @Check('dongiadien >= 0')
  dongiadien: number;

  @Column({ name: "dongianuoc", type: "float" })
  @Check('dongianuoc >= 0')
  dongianuoc: number;

  @OneToMany(() => Hoadon, (hoadon) => hoadon.diennuoc)
  hoadons: Hoadon[];
}
  