import { Expose, plainToInstance, Transform } from "class-transformer";
import UserDto from "src/auth/dto/user-dto";
import User from "src/auth/models/user.entity";
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
    if (value instanceof User) {
      return UserDto.fromEntity(value);
    }
    return value;
  })
  addedBy: UserDto;

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
      return value.toUTCString();
    }
    return value;
  })
  aired: string;

  @Expose()
  status: AnimeStatus;

  @Expose()
  targetGroup?: TargetGroup;

  static fromEntity(entity: Series) {
    return plainToInstance(SeriesDto, entity, { excludeExtraneousValues: true });
  }
}
