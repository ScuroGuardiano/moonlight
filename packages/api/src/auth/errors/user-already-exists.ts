import { BadRequestException, HttpStatus } from "@nestjs/common"
import { createApiErrorResponse } from "src/common/api-error"

export default class UserAlreadyExistsException extends BadRequestException {
  constructor() {
    super(createApiErrorResponse(HttpStatus.BAD_REQUEST, [{
      code: "AUTH:001",
      message: "Email or username is already used."
    }]));
  }
}
