import { Injectable, ForbiddenException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import {
  UserNotFounException,
  UserMisMatchException,
} from '../common/exception/error.exception'
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
      where: { email: loginUserDto.email }
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

  async login(user: any) {
    const payload = { email: user.email, userName: user.userName, id: user.id, role:user.role };
    return {
      accessToken: this.jwtService.sign(payload)
    }
  }
}
