import { IsString, IsNumber } from "class-validator";

export class KeywordFileDto {
    @IsNumber()
    page: number;

    @IsString()
    keyword: string;
}
