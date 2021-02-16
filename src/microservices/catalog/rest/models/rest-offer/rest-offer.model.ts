import { IsInt, IsString } from 'class-validator';

export class RestOfferModel {
  @IsInt()
  offer_id: number;

  @IsString()
  name: string;

  @IsString()
  description: string;

  constructor(offer_id: number, name: string, description: string) {
    this.offer_id = offer_id;
    this.name = name;
    this.description = description;
  }
}
