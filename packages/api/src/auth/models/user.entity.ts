import Permission from "src/authorization/models/permission.entity";
import Role from "src/authorization/models/role.entity";
import { BeforeInsert, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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
  usernameLower: string; 

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

  @Column({ default: false })
  isAdmin?: boolean;

  @Column()
  joined: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => Role)
  @JoinTable()
  roles: Role[];

  @ManyToMany(() => Permission)
  @JoinTable()
  permissions: Permission[]

  static create(username: string, email: string, hashedPassword: string): User {
    const user = new User();
    user.username = username;
    user.usernameLower = username.toLowerCase();
    user.password = hashedPassword;
    user.email = email;

    return user;
  }

  @BeforeInsert()
  setJoinedDate() {
    this.joined = new Date();
  }
}
