import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorCode } from "./error.enum"

class UnAuthorizedException extends HttpException {
  constructor() { super(ErrorCode.CM001, HttpStatus.UNAUTHORIZED); }
}
class AccessTokenNotFoundException extends HttpException {
  constructor() { super(ErrorCode.CM002, HttpStatus.NOT_FOUND); }
}
class RefreshTokenNotFoundException extends HttpException {
  constructor() { super(ErrorCode.CM003, HttpStatus.NOT_FOUND); }
}

class UserNotFounException extends HttpException {
  constructor() { super(ErrorCode.USER01, HttpStatus.FORBIDDEN); }
}
class UserMisMatchException extends HttpException {
  constructor() { super(ErrorCode.USER02, HttpStatus.FORBIDDEN); }
}
class EmailAlreadyExistException extends HttpException {
  constructor() { super(ErrorCode.USER03, HttpStatus.FORBIDDEN); }
}

export {
  UnAuthorizedException,
  AccessTokenNotFoundException,
  RefreshTokenNotFoundException,
  UserNotFounException,
  UserMisMatchException,
  EmailAlreadyExistException,
}