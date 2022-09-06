import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { File } from './entities/file.entity';
import { UserService } from '../user/user.service';
import { UploadFileDto } from './dto/upload-file.dto'
import { JwtUtil } from '../auth/guard/jwt.util';
import { Pagination } from '../common/pagination/paginate';
import * as bcrypt from 'bcrypt';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File)
    private fileRepository: Repository<File>,
    private readonly jwtUtil: JwtUtil,
    private readonly userService: UserService
  ) {}
  async uploadFile(
    auth: string,
    file: Express.Multer.File,
    uploadFileDto: UploadFileDto
  ) {
    const decoded = await this.jwtUtil.decode(auth);
    const user = await this.userService.findOne(decoded.username) // username → email
    const newFile = new File();
    newFile.user = user;
    newFile.fileId = await bcrypt.hash(file.buffer, 10);
    newFile.filename = file.originalname;
    newFile.fileSize = file.size;
    newFile.mimeType = file.mimetype;
    newFile.path = uploadFileDto.path;
    return await this.fileRepository.save(newFile);
  }

 async findFileType (mimeType: string, page: number, take: number) {
  const [results, total] = await this.fileRepository.findAndCount({
    select: ['id', 'fileId', 'filename', 'fileSize', 'isLike', 'createdAt'],
    where: mimeType !== '' ? { mimeType: Like(`%${mimeType}%`) } : {},
    take: take,
    skip: take * page,
    order: { createdAt: 'DESC' },
  });
  const pagination = new Pagination<File>({
    results,
    total,
  });
  return pagination.results;
 }

  listFileType(
    filePath: string,
    folderPath: string,
    type: string,
    page: number
  ) {
    if (filePath) {
      switch(type) {
        case 'all': return this.findFileType('', page, 10)
        case 'photo': return this.findFileType('image', page, 10)
        case 'video': return this.findFileType('video', page, 10)
        case 'download': return this.findFileType('', page, 5)
        case 'recent': return this.findFileType('', page, 10)
        default: return this.findFileType('', page, 10)
      }
    }
    return [];
  }

  async searchFileList(
    keyword: string,
    page: number
  ) {
    const [results, total] = await this.fileRepository.findAndCount({
      select: ['id', 'fileId', 'filename', 'fileSize', 'isLike', 'createdAt'],
      take: 10, // → Default
      skip: 10 * page,
      order: { createdAt: 'DESC' },
    });
    const pagination = new Pagination<File>({
      results,
      total,
    });
    return pagination.results;
  }
}
