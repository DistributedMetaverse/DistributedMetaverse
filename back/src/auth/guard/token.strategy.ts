import { JwtService } from '@nestjs/jwt';
import { Injectable } from "@nestjs/common";
import { UserService } from '../../user/user.service';
import { TokenUserDto } from '../dto/token-user.dto';
import { RefreshTokenNotFoundException } from '../../common/exception/error.exception'

@Injectable()
export class TokenStrategy {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService
  ) {}

  async validate(username: string, accesstoken: string, refreshtoken: string): Promise<any> {
    let tokenUserDto: TokenUserDto = {
      username: username,
      accesstoken: accesstoken,
      refreshtoken: refreshtoken,
    }
    
    try{
      const decoded = await this.jwtService.verify(tokenUserDto.refreshtoken);
      const user = await this.userService.findOne(decoded.email)

      if(!user) {
        throw new RefreshTokenNotFoundException();
      }
      return { refreshtoken, ...user };
    } catch {
      throw new RefreshTokenNotFoundException() // → Refresh Token 만료시간(verify) 검증
    }
  }
}