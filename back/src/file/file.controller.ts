import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import { DownloadFileDto } from './dto/download-file.dto';
import { UploadFileDto } from './dto/upload-file.dto';
import { UploadSubmitFileDto } from './dto/upload.submit-file.dto';
import { ModifyFileDto } from './dto/modify-file.dto';
import { SearchFileDto } from './dto/search-file.dto';
import { User } from '../user/entities/user.entity';
import { AuthToken } from '../auth/auth.decorator';

@Controller('file')
export class FileController {
  constructor(
    private readonly fileService: FileService
  ) {}

  @Post('download')
  downloadFile(
    @AuthToken() user: User,
    @Body() downloadFileDto: DownloadFileDto
  ) {
    return this.fileService.downloadFile(user, downloadFileDto);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @AuthToken() user: User,
    @Body() uploadFileDto: UploadFileDto
  ) {
    return this.fileService.uploadFile(user, file, uploadFileDto);
  }

  @Post('upload/submit')
  uploadSubmit(
    @AuthToken() user: User,
    @Body() uploadSubmitFileDto: UploadSubmitFileDto
  ) {
    return this.fileService.uploadSubmitFile(user, uploadSubmitFileDto);
  }

  @Get('list')
  listFile(
    @AuthToken() user: User,
    @Query('file') filePath: string,
    @Query('folder') folderPath: string,
    @Query('type') type: string,
    @Query('page') page: number,
  ) {
    return this.fileService.listFileType(user, filePath, folderPath, type, page);
  }

  @Get('info/:fileId')
  infoFile(
    @AuthToken() user: User,
    @Param('fileId') fileId: string,
  ) {
    return this.fileService.infoFileDetail(user, fileId);
  }

  @Get('shared/:id')
  sharedList(
    @Param('id') id: string,
    @Query('page') page: number,
  ) {
    return this.fileService.sharedList(+id, page);
  }

  @Patch('modify/:id')
  modifyFile(
    @Param('id') id: string,
    @Body() modifyFileDto: ModifyFileDto
  ) {
    return this.fileService.modifyFile(+id, modifyFileDto);
  }

  @Patch('delete')
  deleteFile(
    @AuthToken() user: User,
    @Body() searchFileDto: SearchFileDto
  ) {
    return this.fileService.deleteFile(user, searchFileDto);
  }

  @Patch('like')
  likeFile(
    @AuthToken() user: User,
    @Body() searchFileDto: SearchFileDto
  ) {
    return this.fileService.likeFile(user, searchFileDto);
  }

  @Patch('apply')
  applyFile(
    @AuthToken() user: User,
    @Body() searchFileDto: SearchFileDto
  ) {
    return this.fileService.applyFile(user, searchFileDto);
  }

  @Get('search')
  searchFile(
    @AuthToken() user: User,
    @Query('keyword') keyword: string,
    @Query('page') page: number,
  ) {
    return this.fileService.searchFileList(user, keyword, page);
  }
}
