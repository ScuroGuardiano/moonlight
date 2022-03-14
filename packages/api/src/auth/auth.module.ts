import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { RevokedJwt } from './models/revoked-jwt.entity';
import User from './models/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ User, RevokedJwt ])
  ],
  providers: [AuthService]
})
export class AuthModule {}
