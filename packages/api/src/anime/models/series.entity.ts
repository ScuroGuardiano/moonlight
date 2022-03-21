import { Exclude, Transform } from "class-transformer";
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
  @Exclude({ toClassOnly: true }) // Security reasons, although nobody shouldn't be able to pass id, coz whitelist on class validation is set on true.
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, {
    eager: true
  })
  addedBy: User;

  @Column({ nullable: true })
  addedById: string;

  @Column()
  name: string;

  @Column('simple-array', { nullable: true })
  alternativeNames?: string[]

  @Column('text', { nullable: true })
  description?: string;

  @Column({ type: "varchar", length: 16, nullable: true })
  ageRating?: AgeRating;

  @Column({ type: "varchar", length: 16, nullable: true })
  type?: AnimeType;

  @Column()
  episodesCount: number;

  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return Date.parse(value);
    }
    return value;
  })
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
