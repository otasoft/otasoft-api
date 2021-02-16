import { IsInt, IsString } from 'class-validator';

export class RestOfferModel {
  @IsInt()
  offer_id: number;

  @IsString()
  name: string;

  @IsString()
  description: string;
}
