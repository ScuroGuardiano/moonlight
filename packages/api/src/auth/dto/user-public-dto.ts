import User from "../models/user.entity";

export default class UserPublicDto {
  username: string;
  joined: string;

  static fromEntity(user: User): UserPublicDto {
    return {
      username: user.username,
      joined: user.joined.toISOString()
    }
  }
}
