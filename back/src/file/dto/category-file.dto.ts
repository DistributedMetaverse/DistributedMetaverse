import { IsString, IsNumber } from "class-validator";

export class CategoryFileDto {
    @IsString()
    fileType: string;
  
    @IsNumber()
    count: number;
}
