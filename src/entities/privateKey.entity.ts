import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { StoreEntity } from "./store.entity";


@Entity("privateKeys")
export class PrivateKeyEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 64 })
  keyHash: string;

  @Column({ type: "integer", nullable: true })
  queriesCount: number;

  @ManyToOne(() => StoreEntity, store => store.id)
  store: StoreEntity;

  @Column({ type: "timestamp" })
  createdAt: string;
}
