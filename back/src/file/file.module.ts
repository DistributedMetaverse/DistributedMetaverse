import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { File } from './entities/file.entity';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { JwtUtil } from '../auth/guard/jwt.util';

@Module({
  imports: [TypeOrmModule.forFeature([User, File])],  // → UserRepository, FileRepository
  providers: [FileService, UserService, JwtService, JwtUtil],
  controllers: [FileController],
})
export class FileModule {}
