import { IsString } from "class-validator";

export default class UserLoginDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}
