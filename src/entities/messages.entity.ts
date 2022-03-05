import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity('messages')
export class MessagesEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'timestamp'})
  date: string;

  //mail or phone
  @Column({length: 254})
  type: string;

  @ManyToOne( () => UserEntity, user => user.id)
  user: UserEntity

  @Column({length: 6})
  code: string;

  @Column({length: 10})
  token: string;

  @Column({type: 'boolean', default: false})
  state: boolean

}