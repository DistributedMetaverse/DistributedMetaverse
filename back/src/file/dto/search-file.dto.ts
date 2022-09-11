import { IsString } from "class-validator";

export class SearchFileDto {
    @IsString()
    fileId: string;
}
