import { IsString } from "class-validator";

export class ModifyFileDto {
    @IsString()
    filename: string;
  
    @IsString()
    description: string;
}
