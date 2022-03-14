import { BadRequestException, HttpStatus } from "@nestjs/common";
import { createApiErrorResponse } from "src/common/api-error";

export default class InvalidUsernameOrPasswordException extends BadRequestException {
  constructor() {
    super(createApiErrorResponse(HttpStatus.BAD_REQUEST, [{
      code: "AUTH:002",
      message: "Invalid username or password"
    }]));
  }
}
