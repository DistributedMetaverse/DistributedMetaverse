import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from '../file/entities/file.entity';
import { User } from '../user/entities/user.entity';
import { CategoryFileDto } from '../file/dto/category-file.dto';
import { indicatorType } from '../common/config/constants';

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

  /**
   * 파일 카테고리 갯수 확인 Service
   * @param user - 해당 유저의 정보를 확인합니다.
   * @returns 
   */
   async findCategory(
    user: User,
  ) {
    return await this.fileRepository.createQueryBuilder('file')
      .select("SUBSTRING_INDEX(file.mime_type, '/', 1) AS fileType")
      .addSelect('COUNT(file.mime_type) AS count')
      .where(
        'file.user_id = :id AND file.is_del = :isDel AND file.down_ipfs = :downIPFS',
        { id: user.id, isDel: Number(false), downIPFS: Number(false) }
      )
      .groupBy('fileType')
      .getRawMany();
  }

  /**
   * 파일 일일 갯수 확인 Service
   * @param user - 해당 유저의 정보를 확인합니다.
   * @returns 
   */
   async findDaliy(
    user: User,
  ) {
    return await this.fileRepository.createQueryBuilder('file')
      .select("CONCAT(year(created_at), '-', LPAD(month(created_at), 2, 0), '-', day(created_at)) AS date")
      .addSelect('COUNT(*) AS count')
      .where(
        'file.user_id = :id AND file.is_del = :isDel AND file.down_ipfs = :downIPFS',
        { id: user.id, isDel: Number(false), downIPFS: Number(false) }
      )
      .groupBy('year(created_at), month(created_at), day(created_at)')
      .getRawMany();
  }

  /**
   * 전체 대비 파일 갯수 확인 Service
   * @param user - 해당 유저의 정보를 확인합니다.
   * @returns 
   */
   async findIndicator(
    user: User,
  ) {
    const allFile = await this.fileRepository.createQueryBuilder('file')
      .select("SUBSTRING_INDEX(file.mime_type, '/', 1) AS fileType")
      .addSelect('COUNT(file.mime_type) AS count')
      .where(
        'file.is_del = :isDel AND file.down_ipfs = :downIPFS',
        { isDel: Number(false), downIPFS: Number(false) }
      )
      .groupBy('fileType')
      .getRawMany();
    const userFile = await this.fileRepository.createQueryBuilder('file')
      .select("SUBSTRING_INDEX(file.mime_type, '/', 1) AS fileType")
      .addSelect('COUNT(file.mime_type) AS count')
      .where(
        'file.user_id = :id AND file.is_del = :isDel AND file.down_ipfs = :downIPFS',
        { id: user.id, isDel: Number(false), downIPFS: Number(false) }
      )
      .groupBy('fileType')
      .getRawMany();
    
    const alls = [0, 0, 0, 0, 0];
    allFile.map((value: CategoryFileDto) => {
      const index = indicatorType.indexOf(value.fileType);
      alls[index] = Number(value.count);
    })
    const users = [0, 0, 0, 0, 0];
    userFile.map((value: CategoryFileDto) => {
      const index = indicatorType.indexOf(value.fileType);
      users[index] = Number(value.count);
    })

    return {
      all: alls,
      user: users,
    }
  }
}
