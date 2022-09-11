import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from './entities/file.entity';
import { Share } from './entities/share.entity';
import { FileService } from './file.service';
import { FileController } from './file.controller';

@Module({
  imports: [TypeOrmModule.forFeature([File, Share])],  // → FileRepository, ShareRepository
  providers: [FileService],
  controllers: [FileController],
})
export class FileModule {}
