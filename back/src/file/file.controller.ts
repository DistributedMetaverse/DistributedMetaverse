import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import { UploadFileDto } from './dto/upload-file.dto'
import { User } from '../user/entities/user.entity';
import { AuthToken } from '../auth/auth.decorator';

@Controller('file')
export class FileController {
  constructor(
    private readonly fileService: FileService
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile() file: Express.Multer.File, 
    @AuthToken() user: User,
    @Body() uploadFileDto: UploadFileDto
  ) {
    return this.fileService.uploadFile(user, file, uploadFileDto);
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

  @Get('search')
  searchFile(
    @AuthToken() user: User,
    @Query('keyword') keyword: string,
    @Query('page') page: number,
  ) {
    return this.fileService.searchFileList(user, keyword, page);
  }
}
