import { IsInt, IsString } from 'class-validator';

export class RestOfferModel {
  @IsInt()
  activity_id: number;

  @IsString()
  name: string;

  @IsString()
  description: string;
}
