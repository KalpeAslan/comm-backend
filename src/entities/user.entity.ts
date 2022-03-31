import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class UserEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  password: string;

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
}
