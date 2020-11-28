import { IsEmail, IsInt } from 'class-validator';

export class UserModel {
  @IsInt()
  id: number;

  @IsEmail()
  email: string;
}
