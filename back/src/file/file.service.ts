import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from './entities/file.entity';
import { UserService } from '../user/user.service';
import { JwtUtil } from '../auth/guard/jwt.util';
import * as bcrypt from 'bcrypt';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File)
    private fileRepository: Repository<File>,
    private readonly jwtUtil: JwtUtil,
    private readonly userService: UserService
  ) {}
  async uploadFile(auth: string, file: Express.Multer.File) {
    const decoded = await this.jwtUtil.decode(auth);
    const user = await this.userService.findOne(decoded.username) // username → email
    const newFile = new File();
    newFile.user = user;
    newFile.fileId = await bcrypt.hash(file.buffer, 10);
    newFile.filename = file.originalname;
    newFile.fileSize = file.size;
    newFile.mimeType = file.mimetype;
    return await this.fileRepository.save(newFile);
  }
}
