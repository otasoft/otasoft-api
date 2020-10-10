import { IsInt, IsString } from 'class-validator';

export class RestAuthUser {
  @IsInt()
  auth_id: number;

  @IsString()
  token: string;
}
