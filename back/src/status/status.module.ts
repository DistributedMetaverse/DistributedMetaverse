import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from '../file/entities/file.entity';
import { StatusService } from './status.service';
import { StatusController } from './status.controller';

@Module({
  imports: [TypeOrmModule.forFeature([File])],  // → FileRepository
  controllers: [StatusController],
  providers: [StatusService]
})
export class StatusModule {}
