import { IsString } from "class-validator";

export class CreateUserDto {
  @IsString()
  email: string;

  @IsString()
  userName: string;

  @IsString()
  password: string;

  @IsString()
  role: string;
}
