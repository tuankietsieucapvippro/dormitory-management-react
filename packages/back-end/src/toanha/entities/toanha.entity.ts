import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Phong } from "../../phong/entities/phong.entity";

@Entity("toanha")
export class Toanha {
  @PrimaryGeneratedColumn({ name: "toanhaid" })
  toanhaid: number;

  @Column({ name: "tentoanha", length: 30, unique: true })
  tentoanha: string;

  @Column({ name: "mota", length: 255, nullable: true })
  mota: string;

  @OneToMany(() => Phong, (phong) => phong.toanha)
  phongs: Phong[];
}
  