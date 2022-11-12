import {
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {UserEntity} from "./user.entity";
import {ProductEntity} from "./product.entity";
import {TransactionEntity} from "./transaction.entity";

@Entity('productTransactions')
export class ProductTransactionsEntity {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => UserEntity, buyer => buyer.id)
    buyer: UserEntity

    @ManyToOne(() => UserEntity, seller => seller.id)
    seller: UserEntity

    @ManyToOne(() => ProductEntity, product => product.id)
    product: ProductEntity

    @OneToOne(() => TransactionEntity, transaction => transaction.id)
    @JoinColumn()
    transaction: TransactionEntity

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updated_at: Date;
}