import { Controller, Get } from '@nestjs/common';
import { StatusService } from './status.service';

@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Get('download')
  findDownloadToday() {
    return this.statusService.findDownloadToday();
  }

  @Get('folder')
  findFolder() {
    return this.statusService.findFolder();
  }
}
