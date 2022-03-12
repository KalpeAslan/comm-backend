import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity("addresses")
export class AddressEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 42 })
  address: string;

  @ManyToOne(() => UserEntity, user => user.id)
  user: UserEntity;

  @Column({ type: "boolean", default: false })
  confirmed: boolean;
}
