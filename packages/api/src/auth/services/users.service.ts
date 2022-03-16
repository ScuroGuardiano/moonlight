import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import UserAlreadyExistsException from "../errors/user-already-exists";
import User from "../models/user.entity";

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  async createNewUser(username: string, email: string, hashedPassword: string) {
    const doesExists = await this.checkForDuplicate(username, email);
    if (doesExists) {
      throw new UserAlreadyExistsException();
    }

    const user = User.create(username, email, hashedPassword);
    await this.userRepository.insert(user);

    return user;
  }

  async getById(id: string): Promise<User> {
    return this.userRepository.findOne(id);
  }

  async getByUsername(username: string): Promise<User> {
    return this.userRepository.findOne({ username });
  }

  async checkForDuplicate(username: string, email: string): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: [
        { email },
        { username }
      ]
    });

    return !!user;
  }
}
