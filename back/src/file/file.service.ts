import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { File } from './entities/file.entity';
import { User } from '../user/entities/user.entity';
import { UploadFileDto } from './dto/upload-file.dto'
import { Pagination } from '../common/pagination/paginate';
import * as bcrypt from 'bcrypt';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File)
    private fileRepository: Repository<File>,
  ) {}
  async uploadFile(
    user: User,
    file: Express.Multer.File,
    uploadFileDto: UploadFileDto
  ) {
    Logger.warn("file user: ", user);
    const newFile = new File();
    newFile.user = user;
    newFile.fileId = await bcrypt.hash(file.buffer, 10);
    newFile.filename = file.originalname;
    newFile.fileSize = file.size;
    newFile.mimeType = file.mimetype;
    newFile.path = uploadFileDto.path;
    return await this.fileRepository.save(newFile);
  }

 async findFileType (
    user: User,
    mimeType: string,
    page: number,
    take: number
  ) {
  const [results, total] = await this.fileRepository.findAndCount({
    select: ['id', 'fileId', 'filename', 'fileSize', 'isLike', 'createdAt'],
    where: mimeType !== '' ? { user: user, mimeType: Like(`%${mimeType}%`) } : { user: user },
    take: take,
    skip: take * page,
    order: { createdAt: 'DESC' },
  });
  const pagination = new Pagination<File>({
    results,
    total,
  });
  return pagination;
 }

  listFileType(
    user: User,
    filePath: string,
    folderPath: string,
    type: string,
    page: number
  ) {
    if (filePath) {
      switch(type) {
        case 'all': return this.findFileType(user, '', page, 10)
        case 'photo': return this.findFileType(user, 'image', page, 10)
        case 'video': return this.findFileType(user, 'video', page, 10)
        case 'download': return this.findFileType(user, '', page, 5)
        case 'recent': return this.findFileType(user, '', page, 10)
        default: return this.findFileType(user, '', page, 10)
      }
    }
    return [];
  }

  async searchFileList(
    user: User,
    keyword: string,
    page: number
  ) {
    const [results, total] = await this.fileRepository.findAndCount({
      select: ['id', 'fileId', 'filename', 'fileSize', 'isLike', 'createdAt'],
      where: keyword !== '' ? { user: user, filename: Like(`%${keyword}%`) } : { user: user},
      take: 10, // → Default
      skip: 10 * page,
      order: { createdAt: 'DESC' },
    });
    const pagination = new Pagination<File>({
      results,
      total,
    });
    return pagination;
  }
}
