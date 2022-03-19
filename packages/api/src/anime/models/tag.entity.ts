import User from "src/auth/models/user.entity";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Series from "./series.entity";

@Entity()
export default class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => User)
  addedBy: User;

  @ManyToMany(() => Series, { nullable: true })
  series: Series[]
}
