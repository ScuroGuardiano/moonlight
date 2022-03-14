import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import UserCreateDto from './dto/user-create.dto';
import { RevokedJwt } from './models/revoked-jwt.entity';
import User from './models/user.entity';
import * as bcrypt from 'bcrypt'
import UserAlreadyExistsException from './errors/user-already-exists';
import UserDto from './dto/user-dto';
import UserLoginDto from './dto/user-login-dto';
import InvalidUsernameOrPasswordException from './errors/invalid-username-or-password';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(RevokedJwt) private revokedJwtRepository: Repository<RevokedJwt>
  ) {}

  async checkForDuplicate(username: string, email: string): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: [
        { email },
        { username }
      ]
    });

    return !!user;
  }

  async register({ username, email, password }: UserCreateDto): Promise<UserDto> {
    const doesExists = await this.checkForDuplicate(username, email);
    if (doesExists) {
      throw new UserAlreadyExistsException();
    }

    const hashedPassword = await this.hashPassword(password);

    const user = User.create(username, email, hashedPassword);
    await this.userRepository.insert(user);

    return UserDto.fromEntity(user);
  }

  async login({ username, password }: UserLoginDto): Promise<UserDto> {
    const user = await this.userRepository.findOne({ username });
    if (!user) {
      throw new InvalidUsernameOrPasswordException();
    }

    if (await this.verifyPassword(password, user.password)) {
      return UserDto.fromEntity(user);
    }

    throw new InvalidUsernameOrPasswordException();
  }

  private async hashPassword(password: string): Promise<string> {
    // TODO: make config param for hash rounds.
    return bcrypt.hash(password, 12);
  }

  private async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}