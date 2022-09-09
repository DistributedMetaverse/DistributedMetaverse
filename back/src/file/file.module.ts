import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { File } from './entities/file.entity';
import { FileService } from './file.service';
import { FileController } from './file.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, File])],  // → UserRepository, FileRepository
  providers: [FileService],
  controllers: [FileController],
})
export class FileModule {}
