import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import Series from "./series.entity";

@Entity()
export default class Gengre {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text', { nullable: true })
  description?: string;

  @ManyToMany(() => Series, { nullable: true })
  series?: Series[]
}
