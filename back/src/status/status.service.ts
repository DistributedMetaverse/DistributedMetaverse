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

  /**
   * 파일을 다운로드하고, Ready 中 상태 Service
   * @param user - 해당 유저의 정보를 확인합니다.
   * @returns 
   */
  async findDownloadCount(user: User) {
    const count = await this.fileRepository.count({
      select: ['id'],
      where: { user: user, downIPFS: true, isDel: false },
    });
    return { count: count };
  }

  /**
   * 특정 폴더에 대한 Path별 갯수 Service
   * @param user - 해당 유저의 정보를 확인합니다.
   * @returns 
   */
  async findFolderPathGroupCount(
    user: User,
  ) {
    return await this.fileRepository.createQueryBuilder('file')
      .select("SUBSTRING_INDEX(file.path, '/', 2) AS folderPath")
      .addSelect('COUNT(file.path) AS count')
      .where(
        'file.user_id = :id AND file.is_del = :isDel AND file.down_ipfs = :downIPFS',
        { id: user.id, isDel: Number(false), downIPFS: Number(false) }
      )
      .groupBy('folderPath')
      .getRawMany();
  }

  /**
   * 파일 타입에 대한 Path별 갯수 Service
   * @param user - 해당 유저의 정보를 확인합니다.
   * @param mimeType - 리스트를 요청할 파일 타입을 확인합니다.
   * @returns 
   */
  async findFileTypePathGroupCount(
    user: User,
    mimeType: string,
  ) {
    return await this.fileRepository.createQueryBuilder('file')
      .select('file.path AS filePath')
      .addSelect('COUNT(file.path) AS count')
      .where(
        'file.user_id = :id AND file.is_del = :isDel AND file.down_ipfs = :downIPFS AND mime_type LIKE :mimeType',
        { id: user.id, isDel: Number(false), downIPFS: Number(false), mimeType: `%${mimeType}%` }
      )
      .groupBy('file.path')
      .getRawMany();
  }

  async findFolder(
    user: User,
  ) {
    return this.findFolderPathGroupCount(user)
  }

  async findFile(
    user: User,
    type: string,
  ) {
    switch(type) {
      case 'all': return this.findFileTypePathGroupCount(user, '')
      case 'photo': return this.findFileTypePathGroupCount(user, 'image')
      case 'video': return this.findFileTypePathGroupCount(user, 'video')
      default: return this.findFileTypePathGroupCount(user, '')
    }
  }
}
