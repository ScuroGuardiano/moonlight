import User from "src/auth/models/user.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AgeRating } from "../enums/age-rating";
import { AnimeStatus } from "../enums/anime-status";
import { AnimeType } from "../enums/anime-type";
import { TargetGroup } from "../enums/target-group";
import Episode from "./episode.entity";
import Gengre from "./gengre.entity";
import Studio from "./studio.entity";
import Tag from "./tag.entity";

@Entity()
export default class Series {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  addedBy: User;

  @Column()
  name: string;

  @Column('simple-array')
  alternativeNames: string[]

  @Column('text')
  description: string;

  @Column({ type: "varchar", length: 16 })
  ageRating: AgeRating;

  @Column({ type: "varchar", length: 16 })
  type: AnimeType;

  @Column()
  episodesCount: number;

  @Column()
  aired: Date;

  @Column({ type: "varchar", length: 16 })
  status: AnimeStatus;

  @Column({ type: 'varchar', length: 16, nullable: true })
  targetGroup?: TargetGroup

  @OneToMany(() => Episode, episode => episode.series, { nullable: true })
  episodes: Episode[]

  @ManyToMany(() => Tag, { nullable: true })
  @JoinTable()
  tags: Tag[]

  @ManyToMany(() => Gengre, { nullable: true })
  @JoinTable()
  gengres: Gengre[]

  @ManyToMany(() => Studio, { nullable: true })
  @JoinTable()
  studios: Studio[]
}
