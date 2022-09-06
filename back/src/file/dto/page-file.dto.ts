import { IsString, IsNumber } from "class-validator";

export class PageFileDto {
    @IsNumber()
    page: number;

    @IsString()
    path: string;

    @IsString()
    type: number;
  
    @IsString()
    identifier: string;
}
