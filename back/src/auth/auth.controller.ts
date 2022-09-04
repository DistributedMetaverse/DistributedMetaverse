import { Controller, Get, Post, Body, Req, Patch, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { LoginUserDto } from './dto/login-user.dto';
import { TokenUserDto } from './dto/token-user.dto';
import { SignupUserDto } from '../user/dto/signup-user.dto';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { TokenAuthGuard } from './guard/token-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly userService: UserService
  ) {}

  @Post('signup')
  create(@Body() signupUserDto: SignupUserDto): Promise<any> {
    return this.userService.create(signupUserDto);
  }

  @UseGuards(LocalAuthGuard)  // 패스워드 및 사용자 유효성 검사 Annotations
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @UseGuards(JwtAuthGuard)  // JWT 유효성 검사 Annotations
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }

  @UseGuards(TokenAuthGuard) // Refresh Token 사용자 유효성 검사 Annotations
  @Patch('refresh')
  getRefresh(@Body() tokenUserDto: TokenUserDto) {
    return this.authService.refresh(tokenUserDto);
  }

  @Get('csrf-token')
  getCsrfToken(@Req() req) {
    return { csrfToken: req.csrfToken() }; 
  }
}
