import { Injectable } from '@nestjs/common';

const folderlist = [
	{
		path: '/',
		count: 2,
	},
	{
		path: '/data/data1',
		count: 10,
	},
	{
		path: '/test1/folder',
		count: 23,
	},
	{
		path: '/test2',
		count: 4,
	},
];

@Injectable()
export class StatusService {

  findDownloadToday() {
    return { count: 4 };
  }

  findFolder() {
    return folderlist;
  }
}
