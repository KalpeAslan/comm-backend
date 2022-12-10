import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import {CurrencyEntity} from "./currency.entity";
import {AddressEntity} from "./addresses.entity";

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

  @ManyToOne(() => AddressEntity, user => user.id)
  from: AddressEntity;

  @ManyToOne(() => AddressEntity, user => user.id)
  to: AddressEntity;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  updated_at: Date;

  @ManyToOne(() => CurrencyEntity, currency => currency.id)
  @JoinColumn()
  currencyFrom: CurrencyEntity

  @ManyToOne(() => CurrencyEntity, currency => currency.id)
  @JoinColumn()
  currencyTo: CurrencyEntity

}
