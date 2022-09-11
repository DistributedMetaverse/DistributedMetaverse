import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from '../file/entities/file.entity';
import { User } from '../user/entities/user.entity';

@Injectable()
export class StatusService {
  constructor(
    @InjectRepository(File)
    private fileRepository: Repository<File>,
  ) {}

  async findDownloadToday(user: User) {
    const count = await this.fileRepository.count({
      select: ['id'],
      where: { user: user, downIPFS: true, isDel: false },
    });
    return { count: count };
  }

  async findFolderGroupCount(user: User) {
    const path = await this.fileRepository.createQueryBuilder('file')
      .select('file.path AS path')
      .addSelect('COUNT(file.path) AS count')
      .where(
        'file.user_id = :id and file.is_del = :isDel and file.down_ipfs = :downIPFS', 
        { id: user.id, isDel: Number(false), downIPFS: Number(false) }
      )
      .groupBy('file.path')
      .getRawMany();
    return path;
  }

  async findFileGroupCount(user: User) {
    const path = await this.fileRepository.createQueryBuilder('file')
      .select('file.path AS path')
      .addSelect('COUNT(file.path) AS count')
      .where(
        'file.user_id = :id and file.is_del = :isDel and file.down_ipfs = :downIPFS', 
        { id: user.id, isDel: Number(false), downIPFS: Number(false) }
      )
      .groupBy('file.path')
      .getRawMany();
    return path;
  }
}
