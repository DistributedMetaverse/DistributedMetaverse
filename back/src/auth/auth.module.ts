import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './guard/local.strategy';
import { JwtStrategy } from './guard/jwt.strategy';
import { TokenStrategy } from './guard/token.strategy';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from '../user/entities/user.entity';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { jwtConstants } from '../common/config/constants';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({  // → Default Mode
      secret: jwtConstants.jwtAccesstokenSecret,
      signOptions: { expiresIn: '60s' },
    }),
    TypeOrmModule.forFeature([User])],
  providers: [AuthService, UserService, LocalStrategy, JwtStrategy, TokenStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
