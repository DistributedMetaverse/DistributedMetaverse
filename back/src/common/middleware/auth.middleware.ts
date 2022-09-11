import { JwtService } from '@nestjs/jwt';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { User } from '../../user/entities/user.entity';
import { UserService } from '../../user/user.service';
import {
  UnAuthorizedException,
  AccessTokenNotFoundException,
  InValidTokenException,
  InternalServerErrorException,
} from '../exception/error.exception'
import { jwtConstants } from '../../common/config/constants';

interface UserRequest extends Request {
    user: User
}

@Injectable()
export class isAuthenticated implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService
  ) {}
  async use(req: UserRequest, res: Response, next: NextFunction) {
    try{
      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
      ) {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = await this.jwtService.verify(
          token,
          { secret: jwtConstants.jwtAccesstokenSecret }
        );
        const user = await this.userService.findOne(decoded.username) // username → email
        if (user) {
          req.user = user
          next()
        } else {
          throw new AccessTokenNotFoundException()
        }
      } else {
        throw new UnAuthorizedException()
      }
    }catch (e) {
      switch (e.message) {
        // 토큰에 대한 오류를 판단합니다.
        case 'INVALID_TOKEN':
        case 'TOKEN_IS_ARRAY':
        case 'NO_USER':
          throw new UnAuthorizedException()
        case 'EXPIRED_TOKEN':
          throw new InValidTokenException()
        default:
          throw new InternalServerErrorException()
      }
    }
  }
}