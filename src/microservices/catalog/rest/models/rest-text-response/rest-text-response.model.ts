import { IsString } from 'class-validator';

export class RestTextResponseModel {
  @IsString()
  response: string;

  constructor(response: string) {
    this.response = response;
  }
}
