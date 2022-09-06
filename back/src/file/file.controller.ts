import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Headers,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import { UploadFileDto } from './dto/upload-file.dto'

@Controller('file')
export class FileController {
  constructor(
    private readonly fileService: FileService
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile() file: Express.Multer.File, 
    @Headers('Authorization') auth: string,
    @Body() uploadFileDto: UploadFileDto
  ) {
    return this.fileService.uploadFile(auth, file, uploadFileDto);
  }

  @Get('list')
  listFile(
    @Query('file') filePath: string,
    @Query('folder') folderPath: string,
    @Query('type') type: string,
    @Query('page') page: number,
  ) {
    return this.fileService.listFileType(filePath, folderPath, type, page);
  }

  @Get('search')
  searchFile(
    @Query('keyword') keyword: string,
    @Query('page') page: number,
  ) {
    return this.fileService.searchFileList(keyword, page);
  }
}
