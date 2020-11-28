import { IsString } from 'class-validator';

export class RestAuthUserCookie {
  @IsString()
  cookie: string;
}
