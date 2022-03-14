import { IsEmail, IsNotIn, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { DONT_USE_THOSE_PASSWORDS_YOU_DUMMY } from "../top-common-password";

export default class UserCreateDto {
  @IsString()
  @MinLength(3)
  @MaxLength(32)
  @Matches(/^[a-zA-Z0-9ęóąśłżźń]+(\ |_)?[a-zA-Z0-9ęóąśłżźń]+$/)
  username: string;

  @IsEmail()
  email: string;

  // I won't force any password policy other than it's length on backend
  // Because it's fucking annoying
  // HOWEVER I am disallowing top common password, coz it's stupid af to use those
  @IsString()
  @MinLength(8)
  @MaxLength(64)
  @IsNotIn(DONT_USE_THOSE_PASSWORDS_YOU_DUMMY)
  password: string;
}
