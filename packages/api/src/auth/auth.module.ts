import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './services/auth.service';
import { AuthController } from './auth.controller';
import User from './models/user.entity';
import { JwtModule } from '@nestjs/jwt';
import getJwtSecret from './helpers/get-jwt-secret';
import getJwtExpire from './helpers/get-jwt-expire';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import Session from './models/session.entity';
import { UsersService } from './services/users.service';
import { SessionService } from './services/session.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([ User, Session ]),
    PassportModule,
    JwtModule.register({
      secret: getJwtSecret(),
      signOptions: { expiresIn: getJwtExpire() }
    })
  ],
  exports: [
    UsersService,
    SessionService,
    JwtAuthGuard
  ],
  providers: [
    AuthService,
    SessionService,
    JwtStrategy,
    UsersService,
    LocalStrategy,
    JwtAuthGuard,
    LocalAuthGuard
  ],
  controllers: [AuthController]
})
export class AuthModule {}
