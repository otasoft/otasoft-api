import { IsString } from 'class-validator';

export class RestAuthUserToken {
  @IsString()
  cookie: string;
}
