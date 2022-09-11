import { Controller, Get } from '@nestjs/common';
import { StatusService } from './status.service';
import { User } from '../user/entities/user.entity';
import { AuthToken } from '../auth/auth.decorator';

@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Get('download')
  findDownloadToday(@AuthToken() user: User) {
    return this.statusService.findDownloadToday(user);
  }

  @Get('folder')
  findFolderPath(@AuthToken() user: User) {
    return this.statusService.findFolderGroupCount(user);
  }

  @Get('file')
  findFilePath(@AuthToken() user: User) {
    return this.statusService.findFileGroupCount(user);
  }
}
