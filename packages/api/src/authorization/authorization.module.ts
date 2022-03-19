import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Permission from './models/permission.entity';
import Role from './models/role.entity';
import IPermission from './permission';

@Module({
  imports: [
    TypeOrmModule.forFeature([ Role, Permission ])
  ]
})
export class AuthorizationModule {
  static permissions: IPermission[] = [];
  static forFeature(permissions: IPermission[] = []): DynamicModule {
    this.permissions.push(...permissions);
    return {
      module: AuthorizationModule,
      providers: [],
      exports: []
    }
  }
}
