import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Episode from './models/episode.entity';
import Gengre from './models/gengre.entity';
import Series from './models/series.entity';
import Studio from './models/studio.entity';
import Tag from './models/tag.entity';
import Upload from './models/upload.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Series,
      Episode,
      Upload,
      Tag,
      Gengre,
      Studio
    ])
  ]
})
export class AnimeModule {}
