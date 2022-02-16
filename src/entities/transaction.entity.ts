import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity("transactions")
export class TransactionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'char', length: 66, name: 'txn_hash'})
  txnHash: string

  @Column({type: "bigint"})
  block: number

  @Column({type: 'timestamp'})
  timestamp: Date

  @Column({type: 'char', length: 18})
  status: string

  @Column({type: 'numeric'})
  value: number

  @OneToMany(() => UserEntity, user => user.id)
  user: UserEntity
}