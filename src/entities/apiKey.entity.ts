import {
    Column,
    CreateDateColumn, DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne, OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {UserEntity} from "./user.entity";
import {AddressEntity} from "./addresses.entity";

@Entity()
export class ApiKeyEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    key: string

    @ManyToOne(() => UserEntity, user => user.id)
    @JoinColumn()
    userId: number

    @ManyToOne(() => AddressEntity, address => address.id)
    @JoinColumn()
    walletAddress: AddressEntity

    @Column({type: 'boolean', default: true})
    limited: boolean

    @Column({type: 'date'})
    lastUsed: string


    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updated_at: Date;

    @DeleteDateColumn()
    deletedAt: string
}