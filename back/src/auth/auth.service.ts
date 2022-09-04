import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import {
  UserNotFounException,
  UserMisMatchException,
} from '../common/exception/error.exception'
import { jwtConstants } from '../common/config/constants';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(loginUserDto: LoginUserDto): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { email: loginUserDto.username }
    });

    if (!user) {
      throw new UserNotFounException()
    }

    const isMatch = await bcrypt.compare(loginUserDto.password, user.password);

    if (isMatch) {
      const { password, ...result } = user;
      return result;
    } else {
      throw new UserMisMatchException()
    }
  }

  // 1. LocalStrategy(validate) → 2. AuthService(validateUser) → 3. LocalStrategy(validate) → 4. AuthService(login)
  async login(user: any) {
    const payload  = {
      email: user.email,
      username: user.username,
      role: user.role,
    };

    return {
      username: user.username,
      accesstoken: this.jwtService.sign(payload, {
        secret: jwtConstants.jwtAccesstokenSecret,
        expiresIn: jwtConstants.jwtAccesstokenValidationSecond,
      }),
      refreshtoken: this.jwtService.sign(payload, {
        secret: jwtConstants.jwtRefreshtokenSecret,
        expiresIn: jwtConstants.jwtRefreshtokenValidationSecond,
      })
    }
  }

  // 1. TokenStrategy(validate) → 2. AuthService(refresh)
  async refresh(user: any) {
    const payload  = {
      email: user.email,
      username: user.username,
      role: user.role,
    };

    return {
      username: user.username,
      accesstoken: this.jwtService.sign(payload, {
        secret: jwtConstants.jwtAccesstokenSecret,
        expiresIn: jwtConstants.jwtAccesstokenValidationSecond,
      }),
      refreshtoken: user.refreshtoken
    }
  }
}
