import User from "../models/user.entity";

export default class UserDto {
  username: string;
  email: string;
  joined: string;

  static fromEntity(user: User): UserDto {
    return {
      username: user.username,
      email: user.email,
      joined: user.joined.toISOString()
    }
  }
}
