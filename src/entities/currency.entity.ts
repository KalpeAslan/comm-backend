import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {ENetwork} from "../constants/common.constants";

@Entity()
export class CurrencyEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    symbol: string

    @Column({type: 'integer'})
    chainId: number

    @Column({default: 'ERC20'})
    type: string

    @Column({default: 18})
    decimals: number

    @Column({nullable: true})
    logoURI: string

    @Column()
    address: string

    @Column({enum: ENetwork})
    network: string

    @Column({nullable: true})
    toUsd: string

    @Column({nullable: true})
    toBtc: string

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updated_at: Date;
}