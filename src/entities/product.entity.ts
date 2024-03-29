import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {UserEntity} from "./user.entity";
import {CurrencyEntity} from "./currency.entity";
import {AddressEntity} from "./addresses.entity";

@Entity('product')
export class ProductEntity{
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => UserEntity, user => user.id)
    user: UserEntity

    @ManyToOne(() => AddressEntity, address => address.id)
    @JoinColumn()
    wallet: AddressEntity

    @Column()
    name: string

    @Column({nullable: true})
    description: string

    @Column()
    price: string

    @ManyToOne(() => CurrencyEntity, currency => currency.id)
    @JoinColumn()
    currency: number

    @Column({nullable: true})
    files: string


    @Column({default: ''})
    modelName: string

    @Column({nullable: true})
    apiLink: string

    @Column({nullable: true})
    status: string

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updated_at: Date;

}