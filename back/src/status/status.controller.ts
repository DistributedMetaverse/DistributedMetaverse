import { Controller, Get, Query } from '@nestjs/common';
import { StatusService } from './status.service';
import { User } from '../user/entities/user.entity';
import { AuthToken } from '../auth/auth.decorator';

@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Get('download')
  download(@AuthToken() user: User) {
    return this.statusService.findDownloadCount(user);
  }

  @Get('folder')
  folderPath(@AuthToken() user: User) {
    return this.statusService.findFolder(user);
  }

  @Get('file')
  filePath(
    @AuthToken() user: User,
    @Query('type') type: string
  ) {
    return this.statusService.findFile(user, type);
  }

  @Get('category')
  category(@AuthToken() user: User) {
    return this.statusService.findCategory(user);
  }

  @Get('daliy')
  daliy(@AuthToken() user: User) {
    return this.statusService.findDaliy(user);
  }

  @Get('indicator')
  indicator(@AuthToken() user: User) {
    return this.statusService.findIndicator(user);
  }
}
