import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CaslModule } from './casl/casl.module';
import { AuthorizationModule } from './authorization/authorization.module';
import { AnimeModule } from './anime/anime.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      autoLoadEntities: true,
      database: 'db.sqlite',
      synchronize: process.env.ENV === 'DEVELOPMENT'
    }),
    AuthModule,
    CaslModule,
    AuthorizationModule,
    AnimeModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
