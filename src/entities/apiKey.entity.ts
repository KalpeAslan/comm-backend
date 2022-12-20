import {
    Column,
    CreateDateColumn, DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {UserEntity} from "./user.entity";

@Entity()
export class ApiKeyEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    key: string

    @ManyToOne(() => UserEntity, user => user.id)
    @JoinColumn()
    userId: number

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