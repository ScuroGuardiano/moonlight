import { Expose, instanceToPlain, plainToInstance, Transform } from "class-transformer";
import UserPublicDto from "src/auth/dto/user-public-dto";
import { AgeRating } from "../enums/age-rating";
import { AnimeStatus } from "../enums/anime-status";
import { AnimeType } from "../enums/anime-type";
import { TargetGroup } from "../enums/target-group";
import Series from "../models/series.entity";

export default class SeriesDto {
  @Expose()
  id: number;

  @Expose()
  @Transform(({ value }) => {
    if (value) {
      return UserPublicDto.fromEntity(value);
    }
    return null;
  })
  addedBy: UserPublicDto;

  @Expose()
  name: string;

  @Expose()
  alternativeNames?: string[];

  @Expose()
  description?: string;

  @Expose()
  ageRating?: AgeRating;

  @Expose()
  type?: AnimeType;

  @Expose()
  episodesCount: number;

  @Expose()
  @Transform(({ value }) => {
    if (value instanceof Date) {
      return value.toISOString();
    }
    return value;
  })
  aired: string;

  @Expose()
  status: AnimeStatus;

  @Expose()
  targetGroup?: TargetGroup;

  static fromEntity(entity: Series) {
    return plainToInstance(SeriesDto, instanceToPlain(entity), { excludeExtraneousValues: true });
  }
}
