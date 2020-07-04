import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn()
  uuid: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
