import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import { UserEntity } from "./user.entity";

@Entity('stores')
export class StoreEntity {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => UserEntity, user => user.id)
  ownerId: number | UserEntity

  @Column()
  name: string

  @Column({ length: 255, nullable: true })
  email: string

  @Column({nullable: true})
  businessUrl: string

  @Column()
  country: string

  // @CreateDateColumn()
  // createdAt: string
  //
  // @UpdateDateColumn()
  // updatedAt: string

}
