import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { RevokedJwt } from './models/revoked-jwt.entity';
import { AuthController } from './auth.controller';
import User from './models/user.entity';
import { JwtModule } from '@nestjs/jwt';
import getJwtSecret from './helpers/get-jwt-secret';
import getJwtExpire from './helpers/get-jwt-expire';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([ User, RevokedJwt ]),
    PassportModule,
    JwtModule.register({
      secret: getJwtSecret(),
      signOptions: { expiresIn: getJwtExpire() }
    })
  ],
  providers: [AuthService, JwtStrategy, LocalStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
