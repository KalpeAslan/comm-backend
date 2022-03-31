import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity('stores')
export class StoreEntity {
  @PrimaryGeneratedColumn()
  id: number

  @OneToOne(() => UserEntity, user => user.id)
  ownerId: number | UserEntity

  @Column({length: 255})
  storeName: string

  @Column()
  imgSrc: string

  @Column({ type: "timestamp" })
  createdAt: string;

  @Column({type: 'smallint'})
  tariff: number

}
