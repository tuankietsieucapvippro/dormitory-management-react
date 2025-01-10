import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import { Taikhoan } from "../../taikhoan/entities/taikhoan.entity";

@Entity("auditlog")
export class Auditlog {
  @PrimaryGeneratedColumn({ name: "logid" })
  logid: number;

  @Column({ name: "actionname", length: 50 })
  actionname: string;

  @Column({ name: "tablename", length: 50 })
  tablename: string;

  @Column({ name: "recordid", type: "int" })
  recordid: number;

  @Column({ name: "actiondate", type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  actiondate: Date;

  @Column({ name: "description", type: "text", nullable: true })
  description: string;

  @ManyToOne(() => Taikhoan)
  @JoinColumn({ name: "userid" })
  user: Taikhoan;
} 