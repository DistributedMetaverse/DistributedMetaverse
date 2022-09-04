import { IsString } from "class-validator";

export class SignupUserDto {
  @IsString()
  email: string;

  @IsString()
  username: string;

  @IsString()
  password: string;
}
