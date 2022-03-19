import User from "src/auth/models/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import Series from "./series.entity";
import Upload from "./upload.entity";

@Entity()
export default class Episode {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  addedBy: User;

  @Column()
  episodeNumber: number;

  @Column({ nullable: true })
  name?: string;

  @Column('simple-json', { nullable: true })
  translationsOfName?: { locale: string, translatedName: string }[];

  @Column()
  aired: Date;

  @Column()
  released: boolean;
  
  @OneToOne(
    () => Episode,
    episode => episode.previousEpisode,
    { nullable: true, eager: true }
  )
  @JoinColumn()
  nextEpisode?: Episode;

  @OneToOne(
    () => Episode,
    episode => episode.nextEpisode,
    { nullable: true }
  )
  previousEpisode?: Episode;

  @OneToMany(() => Upload, upload => upload.episode, { nullable: true })
  uploads?: Upload[]

  @ManyToOne(() => Series, series => series.episodes)
  series?: Series;
}
