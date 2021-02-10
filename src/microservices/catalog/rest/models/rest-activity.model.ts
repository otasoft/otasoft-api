import { IsInt, IsString } from 'class-validator';

export class RestActivityModel {
  @IsInt()
  activity_id: number;

  @IsString()
  name: string;

  @IsString()
  description: string;
}
