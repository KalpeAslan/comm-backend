import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
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

  @Column({length: 20})
  currency: string

  @Column({type: 'text', nullable: true})
  additionalInfo

  @ManyToOne(() => UserEntity, user => user.id)
  from: UserEntity | number;

  @ManyToOne(() => StoreEntity, store => store.id)
  to: StoreEntity | number;
}
