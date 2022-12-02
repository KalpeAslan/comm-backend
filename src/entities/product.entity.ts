import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {UserEntity} from "./user.entity";

@Entity('product')
export class ProductEntity{
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => UserEntity, user => user.id)
    user: UserEntity

    @Column()
    name: string

    @Column({nullable: true})
    description: string

    @Column()
    price: string

    @Column({nullable: true})
    currency: string

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