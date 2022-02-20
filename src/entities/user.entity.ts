import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class UserEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'bigint'})
  passportId: string;

  @Column({type: 'timestamp', name: 'birth_date'})
  birthDate: Date;

  @Column({length: 255, nullable: true})
  photo: string;

  @Column({length: 255, nullable: true})
  patronymic: string

  @Column({length: 255})
  name: string

  @Column({length: 255})
  surname: string

  @Column({type: 'character', length: 42})
  address: string

  @Column({type: 'integer', nullable: true})
  phone: number

  @Column({length: 255, nullable: true})
  email:string

}