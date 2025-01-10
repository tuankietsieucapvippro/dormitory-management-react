import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import { Phong } from "../../phong/entities/phong.entity";
import { Diennuoc } from "../../diennuoc/entities/diennuoc.entity";

@Entity("hoadon")
export class Hoadon {
  @PrimaryGeneratedColumn({ name: "hoadonid" })
  hoadonid: number;

  @ManyToOne(() => Phong, (phong) => phong.hoadons)
  @JoinColumn({ name: "phongid" })
  phong: Phong;

  @ManyToOne(() => Diennuoc, (diennuoc) => diennuoc.hoadons)
  @JoinColumn({ name: "diennuocid" })
  diennuoc: Diennuoc;

  @Column({ name: "ngaylaphd", type: "date" })
  ngaylaphd: Date;

  @Column({ name: "tinhtrang", length: 30 })
  tinhtrang: string;
}
  