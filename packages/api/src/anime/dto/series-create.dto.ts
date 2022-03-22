import { IsDateString, IsEnum, IsInt, IsOptional, IsString } from "class-validator";
import { AgeRating } from "../enums/age-rating";
import { AnimeStatus } from "../enums/anime-status";
import { AnimeType } from "../enums/anime-type";
import { TargetGroup } from "../enums/target-group";

export default class SeriesCreateDto {
  @IsString()
  name: string;

  @IsString({ each: true })
  @IsOptional()
  alternativeNames?: string[]

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(AgeRating)
  @IsOptional()
  ageRating?: AgeRating;

  @IsEnum(AnimeType)
  @IsOptional()
  type?: AnimeType;

  @IsInt()
  episodesCount: number;

  @IsDateString()
  aired: string;

  @IsEnum(AnimeStatus)
  status: AnimeStatus;

  @IsEnum(TargetGroup)
  @IsOptional()
  targetGroup?: TargetGroup;
}
