import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import { Sinhvien } from "../../sinhvien/entities/sinhvien.entity";
import { Phong } from "../../phong/entities/phong.entity";
import { Check } from "typeorm";

@Entity("dkphong")
export class Dkphong {
  @PrimaryGeneratedColumn({ name: "dkphongid" })
  dkphongid: number;

  @ManyToOne(() => Sinhvien, (sinhvien) => sinhvien.dkphongs)
  @JoinColumn({ name: "sinhvienid" })
  sinhvien: Sinhvien;

  @ManyToOne(() => Phong, (phong) => phong.dkphongs)
  @JoinColumn({ name: "phongid" })
  phong: Phong;

  @Column({ name: "ngaydk", type: "date" })
  ngaydk: Date;

  @Column({ name: "ngaytra", type: "date", nullable: true })
  @Check('ngaytra >= ngaydk')
  ngaytra: Date;
}
  