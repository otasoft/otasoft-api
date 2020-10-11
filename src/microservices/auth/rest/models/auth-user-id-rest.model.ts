import { IsInt } from 'class-validator';

export class RestAuthUserId {
  @IsInt()
  auth_id: number;
}
