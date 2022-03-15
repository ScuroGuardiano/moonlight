import { HttpStatus, UnauthorizedException } from "@nestjs/common";
import { createApiErrorResponse } from "src/common/api-error";

export default class InvalidUsernameOrPasswordException extends UnauthorizedException {
  constructor() {
    super(createApiErrorResponse(HttpStatus.UNAUTHORIZED, [{
      code: "AUTH:002",
      message: "Invalid username or password"
    }]));
  }
}
