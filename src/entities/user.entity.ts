import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import {Exclude} from "class-transformer";
import {AddressEntity} from "./addresses.entity";

@Entity("users")
export class UserEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Exclude()
  @Column({ length: 255, nullable: true })
  password: string;

  @Exclude()
  @Column({nullable: true})
  refresh_token: string

  @Column({ type: "timestamp", name: "birth_date", nullable: true })
  birthDate: Date;

  @Column({ type: "bigint", nullable: true })
  passportId: string;

  @Column({ length: 20, nullable: true })
  phone: string;

  @Column({ length: 255, nullable: true })
  email: string;

  @Column({ length: 255, nullable: true })
  photo: string;

  @Column({ length: 255, nullable: true })
  middle: string;

  @Column({ length: 255, nullable: true })
  name: string;

  @Column({ length: 255, nullable: true })
  surname: string;

  @Column({ nullable: true })
  country: string;

  @Column({ type: "boolean", default: false })
  confirmed: boolean;

  @Column({ type: "integer", nullable: true })
  index: number;

  @Column({ length: 255, nullable: true })
  street: string;

  @Column({ length: 100, nullable: true })
  city: string;

  @Column({default: false, type: 'boolean'})
  kyc: boolean

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  updated_at: Date;


  @OneToMany(() => AddressEntity, address => address.id, {nullable: true})
  wallets: AddressEntity[]
}
