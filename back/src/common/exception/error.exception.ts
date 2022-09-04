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
  EmailAlreadyExistException,
  UserNotFounException,
  PasswordMisMatchException,
  UserMisMatchException,
}