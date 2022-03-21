import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import SeriesCreateDto from './dto/series-create.dto';
import SeriesDto from './dto/series.dto';
import { SeriesService } from './services/series.service';

@Controller('anime')
export class AnimeController {
  constructor(private seriesService: SeriesService) {}

  @Get(['/', '/series'])
  async getSeries(): Promise<SeriesDto[]> {
    const series = await this.seriesService.getSeries();
    return series.map(SeriesDto.fromEntity);
  }

  @UseGuards(JwtAuthGuard)
  @Post(['/', '/series'])
  async addNewSeries(@Request() req, @Body() body: SeriesCreateDto): Promise<SeriesDto> {
    const series = await this.seriesService.addNewSeries(body, req.user.id);
    return SeriesDto.fromEntity(series);
  }
}
