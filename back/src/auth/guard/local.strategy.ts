import { Injectable, Logger } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { LoginUserDto } from '../dto/login-user.dto';
import { UserMisMatchException } from '../../common/exception/error.exception'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'username' // username 필드가 있는지 검사함
    });
  }

  async validate(username: string, password: string): Promise<any> {
    let loginUserDto: LoginUserDto = {
      username: username,
      password: password,
    }
    
    const user = await this.authService.validateUser(loginUserDto);

    if(!user) {
      throw new UserMisMatchException();
    }
    return user;
  }
}