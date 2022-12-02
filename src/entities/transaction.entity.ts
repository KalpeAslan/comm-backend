import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import { UserEntity } from "./user.entity";
import { StoreEntity } from "./store.entity";

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

  @Column({length: 20, nullable: true})
  currency: string

  @Column({type: 'text', nullable: true})
  additionalInfo

  @ManyToOne(() => UserEntity, user => user.id)
  from: UserEntity;

  @ManyToOne(() => UserEntity, user => user.id)
  to: UserEntity;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  updated_at: Date;
}
