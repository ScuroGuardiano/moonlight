import User from "src/auth/models/user.entity";
import { Action } from "src/authorization/action";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import Role from "./role.entity";

@Entity()
export default class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  subject: string;

  @Column({ type: "varchar", length: 255 })
  action: Action

  @Column("simple-json", { nullable: true })
  conditions?: any;

  @ManyToMany(() => User)
  users: User[];

  @ManyToMany(() => Role)
  roles: Role[];
}
