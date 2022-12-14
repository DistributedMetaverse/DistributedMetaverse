import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Not, Repository } from 'typeorm';
import { File } from './entities/file.entity';
import { Share } from './entities/share.entity';
import { User } from '../user/entities/user.entity';
import { DownloadFileDto } from './dto/download-file.dto';
import { UploadFileDto } from './dto/upload-file.dto';
import { UploadSubmitFileDto } from './dto/upload.submit-file.dto';
import { ModifyFileDto } from './dto/modify-file.dto';
import { SearchFileDto } from './dto/search-file.dto';
import { Pagination } from '../common/pagination/paginate';
import {
  FileNotFoundException,
  FileAlreadyExistException,
} from '../common/exception/error.exception';
import * as bcrypt from 'bcrypt';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File)
    private fileRepository: Repository<File>,
    @InjectRepository(Share)
    private shareRepository: Repository<Share>,
  ) {}

  /**
   * 파일 다운로드 Service
   * @param user - 해당 유저의 정보를 확인합니다.
   * @param downloadFileDto - 다운로드한 파일의 부가적인 속성을 확인합니다.
   * @returns 
   */
  async downloadFile(
    user: User,
    downloadFileDto: DownloadFileDto
  ) {
    const file = await this.fileRepository.findOne({
      where: { id: downloadFileDto.id }
    });
    if (!file) {
      throw new FileNotFoundException()
    }

    const isExist = await this.fileRepository.findOne({
      where: { user: user, fileId: downloadFileDto.fileId }
    });
    if (isExist) {
      throw new FileAlreadyExistException()
    }

    const newShare = new Share();
    newShare.file = file;
    newShare.user = user;
    newShare.nodeId = downloadFileDto.fileId;
    await this.shareRepository.save(newShare);

    const newFile = new File();
    newFile.user = user;
    newFile.fileId = file.fileId;
    newFile.filename = file.filename;
    newFile.fileSize = file.fileSize;
    newFile.mimeType = file.mimeType;
    //newFile.path = file.path; // → X
    newFile.path = '/'; // → O
    newFile.transactionId = file.transactionId;
    newFile.downIPFS = true;  // → IPFS에서 해시값 확인
    return await this.fileRepository.save(newFile);
  }

  /**
   * 파일 업로드 Service
   * @param user - 해당 유저의 정보를 확인합니다.
   * @param file - 업로드한 파일의 정보를 확인합니다.
   * @param uploadFileDto - 업로드의 파일의 부가적인 속성을 확인합니다.
   * @returns 
   */
  async uploadFile(
    user: User,
    file: Express.Multer.File,
    uploadFileDto: UploadFileDto
  ) {
    const newFile = new File();
    newFile.user = user;
    newFile.fileId = await (await bcrypt.hash(file.buffer, 10)).replace(/\//gi, '');
    newFile.filename = Buffer.from(file.originalname, 'latin1').toString('utf-8');
    newFile.fileSize = file.size;
    newFile.mimeType = file.mimetype;
    newFile.path = uploadFileDto.path;
    return await this.fileRepository.save(newFile);
  }

  async uploadSubmitFile(
    user: User,
    uploadSubmitFileDto: UploadSubmitFileDto
  ) {
    const newFile = new File();
    newFile.user = user;
    newFile.fileId = uploadSubmitFileDto.fileId;
    newFile.filename = uploadSubmitFileDto.filename;
    newFile.fileSize = uploadSubmitFileDto.fileSize;
    newFile.mimeType = uploadSubmitFileDto.mimeType;
    newFile.path = uploadSubmitFileDto.path;
    newFile.transactionId = uploadSubmitFileDto.transactionId;
    return await this.fileRepository.save(newFile);
  }

  /**
   * Root 폴더 별 갯수 요청 Service
   * @param user - 해당 유저의 정보를 확인합니다.
   * @param mimeType - 리스트를 요청할 파일 타입을 확인합니다.
   * @param page - 리스트를 요청할 폴더의 페이지 정보를 확인합니다.
   * @returns 
   */
  async findFolderRoot(
    user: User,
    mimeType: string,
    page: number,
  ) {
    const queryBuilder = this.fileRepository.createQueryBuilder('file')
      .select("SUBSTRING_INDEX(file.path, '/', 2) AS folderPath")
      .addSelect('COUNT(file.path) AS count')
      .where(
        'file.user_id = :id AND path LIKE :path AND mime_type LIKE :mimeType AND file.is_del = :isDel AND file.down_ipfs = :downIPFS',
        { id: user.id, path: '/%', mimeType: `%${mimeType}%`, isDel: Number(false), downIPFS: Number(false) }
      )
      .groupBy('folderPath');
    const count = await queryBuilder.getCount();
    const results = await queryBuilder
      .take(10)
      .skip(10 * (page - 1))
      .orderBy("file.createdAt", "DESC")
      .getRawMany();

    return {
      results: results,
      take: results.length,
      total: count,
    }
  }

  /**
   * (Root 폴더 이외의) 폴더 별 갯수 요청 Service
   * @param user - 해당 유저의 정보를 확인합니다.
   * @param path - 리스트를 요청할 폴더 경로를 확인합니다.
   * @param mimeType - 리스트를 요청할 파일 타입을 확인합니다.
   * @param page - 리스트를 요청할 폴더의 페이지 정보를 확인합니다.
   * @returns 
   */
  async findFolderCommon(
    user: User,
    path: string,
    mimeType: string,
    page: number,
  ) {
    const index = path.length + 1
    const queryBuilder = this.fileRepository.createQueryBuilder('file')
      .select(
        "CONCAT('" + path + "', SUBSTRING_INDEX(SUBSTR(path, " + index + "), '/', 2)) AS folderPath, SUBSTRING_INDEX(SUBSTR(path, " + index + "), '/', 2) AS subPath"
      )
      .addSelect('COUNT(file.path) AS count')
      .where(
        'file.user_id = :id AND path LIKE :path AND mime_type LIKE :mimeType AND file.is_del = :isDel AND file.down_ipfs = :downIPFS',
        { id: user.id, path: `${path}%`, mimeType: `%${mimeType}%`, isDel: Number(false), downIPFS: Number(false) }
      )
      .groupBy('subPath');
    const count = await queryBuilder.getCount();
    const results = await queryBuilder
      .take(10)
      .skip(10 * (page - 1))
      .orderBy("file.createdAt", "DESC")
      .getRawMany();

    return {
      results: results,
      take: results.length,
      total: count,
    }
  }

  /**
   * 파일 타입 정보 리스트 요청 Service
   * @param user - 해당 유저의 정보를 확인합니다.
   * @param path - 리스트를 요청할 파일 경로를 확인합니다.
   * @param mimeType - 리스트를 요청할 파일 타입을 확인합니다.
   * @param page - 리스트를 요청할 파일 타입의 페이지 정보를 확인합니다.
   * @param take - 페이징을 요청할 최대 갯수를 확인합니다.
   * @param downIPFS - IPFS에서 다운받았는지 여부를 확인합니다.
   * @param order - 내림차순(DESC) / 오름차순(ASC)을 확인합니다.
   * @returns 
   */
  async findFileType (
    user: User,
    path: string,
    mimeType: string,
    page: number,
    take: number,
    downIPFS: boolean,
    order: boolean,
  ) {
    const [results, total] = await this.fileRepository.findAndCount({
      select: ['id', 'fileId', 'filename', 'fileSize', 'mimeType', 'path', 'isLike', 'createdAt'],
      where:
        mimeType !== ''
        ? {
          user: user,
          path: path,
          mimeType: Like(`%${mimeType}%`),
          isDel: false,
          downIPFS: downIPFS,
        }
        : { user: user, path: path, isDel: false, downIPFS: downIPFS },
      take: take,
      skip: take * (page - 1),
      order: order ? { createdAt: 'DESC' } : { createdAt: 'ASC' },
    });
    const pagination = new Pagination<File>({
      results,
      total,
    });
    return pagination;
  }

  /**
   * 폴더 / 파일 타입 정보 리스트 요청 Service
   * @param user - 해당 유저의 정보를 확인합니다.
   * @param filePath - 리스트를 요청할 파일 경로를 확인합니다.
   * @param folderPath - 리스트를 요청할 폴더 경로를 확인합니다.
   * @param type - 리스트를 요청할 파일 타입을 확인합니다.
   * @param page - 리스트를 요청할 파일 타입의 페이지 정보를 확인합니다.
   * @returns 
   */
  listFileType(
    user: User,
    filePath: string,
    folderPath: string,
    type: string,
    page: number
  ) {
    if (filePath) {
      switch(type) {
        case 'all': return this.findFileType(user, filePath, '', page, 10, false, false)
        case 'photo': return this.findFileType(user, filePath, 'image', page, 10, false, false)
        case 'video': return this.findFileType(user, filePath, 'video', page, 10, false, false)
        case 'download': return this.findFileType(user, filePath, '', page, 10, true, false)
        case 'recent': return this.findFileType(user, filePath, '', page, 10, false, true)
        default: return this.findFileType(user, filePath, '', page, 10, false, false)
      }
    }
    if (folderPath === '/') {
      switch(type) {
        case 'all': return this.findFolderRoot(user, '', page)
        case 'photo': return this.findFolderRoot(user, 'image', page)
        case 'video': return this.findFolderRoot(user, 'video', page)
        default: return this.findFolderRoot(user, '', page)
      }
    }
    switch(type) {
      case 'all': return this.findFolderCommon(user, folderPath, '', page)
      case 'photo': return this.findFolderCommon(user, folderPath, 'image', page)
      case 'video': return this.findFolderCommon(user, folderPath, 'video', page)
      default: return this.findFolderCommon(user, folderPath, '', page)
    }
  }

  /**
   * 해당 파일의 공유된 사용자들에 대한 정보 확인 Service
   * @param id - 해당 파일의 식별ID를 확인합니다.
   * @param take - 리스트를 요청할 페이지의 갯수를 제한합니다.
   * @param page - 리스트를 요청할 페이지 정보를 확인합니다.
   * @returns 
   */
  async sharedListUser(
    id: number,
    take: number,
    page: number
  ): Promise<[Array<User>, number]> {
    const [shares, total] = await this.shareRepository.findAndCount({
      select: ['user'],
      relations: ['user'],
      where: { file: { id: id }, isDown: true },
      take: take, // → Default
      skip: take * (page - 1),
      order: { createdAt: 'DESC' },
    });
    
    const users = new Array<User>;
    shares.map((value: Share) => {
      users.push(value.user)
    })

    return [users, total]
  }

  /**
   * 파일의 세부정보 확인 Service
   * @param user - 해당 유저의 정보를 확인합니다.
   * @param fileId - IPFS에 등록한 파일의 해시값을 확인합니다.
   * @returns 
   */
  async infoFileDetail(
    user: User,
    fileId: string,
  ) {
    const file = await this.fileRepository.findOne({
      where: { user: user, fileId: fileId }
    })
    const [results, total] = await this.sharedListUser(file.id, 3, 1) // take → 3
    if (total > 0) return { shared: results, ...file }
    return file
  }

  /**
   * 해당 파일의 공유된 사용자들에 대한 리스트 페이징 Service
   * @param id - 해당 파일의 식별ID를 확인합니다.
   * @param page - 리스트를 요청할 페이지 정보를 확인합니다.
   * @returns 
   */
  async sharedList(
    id: number,
    page: number
  ) {
    const [results, total] = await this.sharedListUser(id, 10, page) // take → 10
    const pagination = new Pagination<User>({
      results,
      total,
    });
    return pagination;
  }

  /**
   * 파일의 세부정보 수정 Service
   * @param id - 해당 파일의 ID값을 확인합니다.
   * @param modifyFileDto - 수정할 파일의 정보를 확인합니다.
   * @returns 
   */
  async modifyFile(
    id: number,
    modifyFileDto: ModifyFileDto
  ) {
    await this.fileRepository.update({ id: id }, { 
      filename: modifyFileDto.filename,
      description: modifyFileDto.description,
    })
    return modifyFileDto
  }

  /**
   * 파일 삭제 Service
   * @param user - 해당 유저의 정보를 확인합니다.
   * @param searchFileDto - 삭제할 파일의 정보를 확인합니다.
   * @returns 
   */
  async deleteFile(
    user: User,
    searchFileDto: SearchFileDto
  ) {
    const file = await this.fileRepository.findOne({
      where: { user: user, fileId: searchFileDto.fileId }
    });

    if (!file) {
      throw new FileNotFoundException()
    }

    await this.fileRepository.update({ id: file.id }, {
      isDel: true,
    })
    return searchFileDto
  }

  /**
   * 파일 즐겨찾기 Service
   * @param user - 해당 유저의 정보를 확인합니다.
   * @param searchFileDto - 즐겨찾기할 파일의 정보를 확인합니다.
   * @returns 
   */
  async likeFile(
    user: User,
    searchFileDto: SearchFileDto
  ) {
    const file = await this.fileRepository.findOne({
      where: { user: user, fileId: searchFileDto.fileId }
    });

    if (!file) {
      throw new FileNotFoundException()
    }
    
    await this.fileRepository.update({ id: file.id }, {
      isLike: !file.isLike,
    })
    return searchFileDto
  }

  /**
   * 다운로드 받은 파일 적용 Service
   * @param user - 해당 유저의 정보를 확인합니다.
   * @param searchFileDto - 즐겨찾기할 파일의 정보를 확인합니다.
   * @returns 
   */
   async applyFile(
    user: User,
    searchFileDto: SearchFileDto
  ) {
    const file = await this.fileRepository.findOne({
      where: { user: user, fileId: searchFileDto.fileId }
    });

    if (!file) {
      throw new FileNotFoundException()
    }
    
    await this.fileRepository.update({ id: file.id }, {
      downIPFS: false,
    })
    await this.shareRepository.update({ file: file, user: user }, {
      isDown: true,
    })
    return searchFileDto
  }

  /**
   * 파일 키워드 검색 Service
   * @param user - 해당 유저의 정보를 확인합니다.
   * @param keyword - 검색할 키워드를 확인합니다.
   * @param page - 페이징을 위해서 검색할 키워드 페이지 정보를 확인합니다.
   * @returns 
   */
  async searchFileList(
    user: User,
    keyword: string,
    page: number
  ) {
    if (keyword !== '') {
      const [results, total] = await this.fileRepository.findAndCount({
        select: ['id', 'fileId', 'filename', 'fileSize', 'mimeType', 'createdAt'],
        where: { user: { id: Not(user.id) }, filename: Like(`%${keyword}%`) },
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
    throw new FileNotFoundException()
  }
}
