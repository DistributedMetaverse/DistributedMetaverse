import { IsString, IsNumber } from "class-validator";

export class DownloadFileDto {
    @IsNumber()
    id: number;

    @IsString()
    fileId: string;

    @IsString()
    filename: string;
  
    @IsNumber()
    fileSize: number;

    @IsString()
    mimeType: string;

    @IsString()
    createdAt: string;
}
