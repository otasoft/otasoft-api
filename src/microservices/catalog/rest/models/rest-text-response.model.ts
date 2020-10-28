import { IsString } from 'class-validator';

export class RestTextResponseModel {
  @IsString()
  response: string;
}
