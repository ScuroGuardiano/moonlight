import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnimeController } from './anime.controller';
import { SeriesService } from './services/series.service';
import Episode from './models/episode.entity';
import Gengre from './models/gengre.entity';
import Series from './models/series.entity';
import Studio from './models/studio.entity';
import Tag from './models/tag.entity';
import Upload from './models/upload.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Series,
      Episode,
      Upload,
      Tag,
      Gengre,
      Studio
    ]),
    AuthModule
  ],
  controllers: [AnimeController],
  providers: [SeriesService]
})
export class AnimeModule {}
