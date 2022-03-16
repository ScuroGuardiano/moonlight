import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity()
export default class Session {
  @PrimaryColumn()
  hashedJwt: string;

  // I don't set relation for user here, coz I don't need it tbh
  // Well maybe it could be useful while deleting user but I can delete all sessions manually, whatever
  @Column()
  userId: string;

  @Column()
  expiration: Date;

  @Column()
  ip: string;

  @Column()
  userAgent: string;

  @CreateDateColumn()
  createdAt: Date;
}
