import { Controller, Get, Query } from '@nestjs/common';
import { StatusService } from './status.service';
import { User } from '../user/entities/user.entity';
import { AuthToken } from '../auth/auth.decorator';

@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Get('download')
  findDownload(@AuthToken() user: User) {
    return this.statusService.findDownloadCount(user);
  }

  @Get('folder')
  findFolderPath(@AuthToken() user: User) {
    return this.statusService.findFolder(user);
  }

  @Get('file')
  findFilePath(
    @AuthToken() user: User,
    @Query('type') type: string
  ) {
    return this.statusService.findFile(user, type);
  }
}
