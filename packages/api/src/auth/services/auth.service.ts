import { Injectable } from '@nestjs/common';
import UserCreateDto from '../dto/user-create.dto';
import User from '../models/user.entity';
import * as bcrypt from 'bcrypt'
import UserLoginDto from '../dto/user-login-dto';
import InvalidUsernameOrPasswordException from '../errors/invalid-username-or-password';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async register({ username, email, password }: UserCreateDto): Promise<User> {
    const hashedPassword = await this.hashPassword(password);
    return this.usersService.createNewUser(username, email, hashedPassword);
  }

  async verifyUser({ username, password }: UserLoginDto): Promise<User> {
    const user = await this.usersService.getByUsername(username);
    if (!user) {
      throw new InvalidUsernameOrPasswordException();
    }

    if (await this.verifyPassword(password, user.password)) {
      return user;
    }
    throw new InvalidUsernameOrPasswordException();
  }

  async signWithBlood(fool: User) {
    const pact = { sub: fool.id };
    const token = await this.jwtService.signAsync(pact);

    return {
      access_token: token
    }
  }
  
  private async hashPassword(password: string): Promise<string> {
    // TODO: make config param for hash rounds.
    return bcrypt.hash(password, 12);
  }

  private async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
