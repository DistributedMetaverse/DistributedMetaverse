import { JwtService } from '@nestjs/jwt';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UserService } from '../../user/user.service';
import {
  UnAuthorizedException,
  AccessTokenNotFoundException,
} from '../exception/error.exception'

interface UserRequest extends Request {
    user: any
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
        const decoded = await this.jwtService.verify(token);
        const user = await this.userService.findOne(decoded.email)
        if (user) {
          req.user = user
          next()
        } else {
          throw new AccessTokenNotFoundException()
        }
      } else {
        throw new UnAuthorizedException()
      }
    }catch {
      throw new AccessTokenNotFoundException()  // → Access Token 만료시간(verify) 검증
    }
  }
}