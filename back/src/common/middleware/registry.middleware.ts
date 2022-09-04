import { Injectable, NestMiddleware, HttpStatus } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { RedirectError } from '../filter/redirect.filter';
import { UserService } from '../../user/user.service';

@Injectable()
export class isAdmin implements NestMiddleware {
  constructor(
    private readonly userService: UserService
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const user = await this.userService.findAll()
    
    if (user.length === 0) {
      throw new RedirectError(HttpStatus.TEMPORARY_REDIRECT, '/auth/admin');
    } else {
      next()
    }
  }
}