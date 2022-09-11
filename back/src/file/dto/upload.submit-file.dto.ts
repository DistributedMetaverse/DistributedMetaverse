import { IsString, IsNumber } from "class-validator";

export class UploadSubmitFileDto {
    @IsString()
    fileId: string;

    @IsString()
    filename: string;

    @IsNumber()
    fileSize: number;

    @IsString()
    mimeType: string;

    @IsString()
    path: string;
}
