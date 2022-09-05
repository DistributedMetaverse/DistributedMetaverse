import { Controller, Post, Bind, Headers, UploadedFile, UseInterceptors, Logger } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';

@Controller('file')
export class FileController {
  constructor(
    private readonly fileService: FileService
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @Bind(UploadedFile())
  uploadFile(file: Express.Multer.File, @Headers('Authorization') auth: string) {
    return this.fileService.uploadFile(auth, file);
  }
}
