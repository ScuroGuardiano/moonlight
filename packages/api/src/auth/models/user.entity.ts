import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export default class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true
  })
  username: string;

  @Column({
    unique: true
  })
  email: string;

  @Column({
    default: false
  })
  verifiedEmail?: boolean;

  @Column()
  password: string;

  @Column()
  joined: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  static create(username: string, email: string, hashedPassword: string): User {
    const user = new User();
    user.username = username;
    user.password = hashedPassword;
    user.email = email;

    return user;
  }

  @BeforeInsert()
  setJoinedDate() {
    this.joined = new Date();
  }
}
