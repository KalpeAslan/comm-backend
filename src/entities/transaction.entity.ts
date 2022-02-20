import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity("transactions")
export class TransactionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "char", length: 66, name: "txn_hash" })
  txnHash: string;

  @Column({ type: "bigint" })
  block: number;

  @Column({ type: "timestamp" })
  timestamp: string;

  @Column({ type: "char", length: 18 })
  status: string;

  @Column({ type: "numeric" })
  value: number;

  @ManyToOne(() => UserEntity, user => user.id)
  from: UserEntity;

  @ManyToOne(() => UserEntity, user => user.id)
  to: UserEntity;
}