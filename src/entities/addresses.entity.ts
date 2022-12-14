import {Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import { UserEntity } from "./user.entity";
import {ENetwork} from "../constants/common.constants";

@Entity("addresses")
export class AddressEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 42, unique: true })
  walletAddress: string;

  @Column({enum:ENetwork})
  network: string

  @ManyToOne(() => UserEntity, user => user.id, {nullable: true})
  user: UserEntity;
}
