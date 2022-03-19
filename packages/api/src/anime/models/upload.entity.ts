import User from "src/auth/models/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Episode from "./episode.entity";

@Entity()
export default class Upload {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  service: string;

  @Column()
  linkToResource: string;

  @Column({ nullable: true })
  linkToEmbed?: string;

  @ManyToOne(() => User, {
    eager: true
  })
  addedBy: User;

  @Column({ nullable: true })
  source: string;

  @Column()
  audioLanguage: string;

  @Column()
  subtitleLanguage: string;

  @ManyToOne(() => Episode, episode => episode.uploads)
  episode: Episode;
}
