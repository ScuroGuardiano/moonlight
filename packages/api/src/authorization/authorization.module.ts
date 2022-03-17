import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Permission from './models/permission.entity';
import Role from './models/role.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ Role, Permission ])
  ]
})
export class AuthorizationModule {}
