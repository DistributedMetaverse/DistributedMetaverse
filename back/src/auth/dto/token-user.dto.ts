import { IsString } from "class-validator";

export class TokenUserDto {
  @IsString()
  username: string;

  @IsString()
  accesstoken: string;

  @IsString()
  refreshtoken: string;
}