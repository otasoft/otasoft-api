import { IsString } from 'class-validator';

export class RestAuthChangeResponse {
  @IsString()
  response: string;
}
