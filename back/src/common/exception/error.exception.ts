import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorCode } from "./error.code"

class UnAuthorizedException extends HttpException {
  constructor() { super(ErrorCode.CM001, HttpStatus.UNAUTHORIZED); }
}
class AccessTokenNotFoundException extends HttpException {
  constructor() { super(ErrorCode.CM002, HttpStatus.UNAUTHORIZED); }
}
class RefreshTokenNotFoundException extends HttpException {
  constructor() { super(ErrorCode.CM003, HttpStatus.FORBIDDEN); }
}
class InValidTokenException extends HttpException {
  constructor() { super(ErrorCode.CM004, HttpStatus.GONE); }
}
class InternalServerErrorException extends HttpException {
  constructor() { super(ErrorCode.CM005, HttpStatus.INTERNAL_SERVER_ERROR); }
}

class EmailAlreadyExistException extends HttpException {
  constructor() { super(ErrorCode.USER01, HttpStatus.FORBIDDEN); }
}
class UserNotFounException extends HttpException {
  constructor() { super(ErrorCode.USER02, HttpStatus.FORBIDDEN); }
}
class PasswordMisMatchException extends HttpException {
  constructor() { super(ErrorCode.USER03, HttpStatus.FORBIDDEN); }
}
class UserMisMatchException extends HttpException {
  constructor() { super(ErrorCode.USER04, HttpStatus.FORBIDDEN); }
}

export {
  UnAuthorizedException,
  AccessTokenNotFoundException,
  RefreshTokenNotFoundException,
  InValidTokenException,
  InternalServerErrorException,
  EmailAlreadyExistException,
  UserNotFounException,
  PasswordMisMatchException,
  UserMisMatchException,
}