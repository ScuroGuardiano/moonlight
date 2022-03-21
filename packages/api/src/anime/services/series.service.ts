import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import SeriesCreateDto from '../dto/series-create.dto';
import Series from '../models/series.entity';

@Injectable()
export class SeriesService {
  constructor(@InjectRepository(Series) private seriesRepository: Repository<Series>) {}

  async addNewSeries(seriesDto: SeriesCreateDto, userId: string): Promise<Series> {
    const series = plainToInstance(Series, seriesDto);
    series.addedById = userId;
    await this.seriesRepository.save(series);
    return series;
  }

  async getSeries() {
    return await this.seriesRepository.find();
  }
}
