import { EMessageTypes } from "src/communication/constants/communication.constants";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity('messages')
export class MessageEntityEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  created_at: Date;

  @Column({enum: EMessageTypes})
  type: EMessageTypes;

  @ManyToOne( () => UserEntity, user => user.id)
  user: UserEntity

  @Column({type: 'varchar', length: 7})
  code: number;

  @Column({type: 'boolean', default: false})
  status: boolean
}

