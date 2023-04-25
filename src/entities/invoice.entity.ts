import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {ApiKeyEntity} from "./apiKey.entity";
import {TransactionEntity} from "./transaction.entity";
import {CurrencyEntity} from "./currency.entity";

@Entity()
export class InvoiceEntity {
    @PrimaryGeneratedColumn()
    id: number

    //Meta data
    @ManyToOne(() => ApiKeyEntity, apiKey => apiKey.id)
    apiKey: ApiKeyEntity

    @Column({type: 'json', nullable: true})
    payload: null | string

    //Invoice Data
    @Column({type: 'varchar', nullable: true})
    price: string

    @OneToOne(() => CurrencyEntity, currency => currency.id)
    @JoinColumn()
    currency: CurrencyEntity

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updated_at: Date;

    //TX Data
    @OneToOne(() => TransactionEntity, transaction => transaction.id, {nullable: true})
    @JoinColumn()
    transaction: TransactionEntity
}