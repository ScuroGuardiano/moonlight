import IPublicUser from "./public-user";

export default interface ISeries {
  id: number;
  addedBy: IPublicUser;
  name: string;
  alternativeNames?: string[];
  description?: string;
  ageRating?: string;
  type?: string;
  episodesCount: number;
  aired: string;
  status: string;
  targetGroup?: string;
}
