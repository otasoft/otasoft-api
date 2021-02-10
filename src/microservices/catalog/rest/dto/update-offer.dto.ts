import { IsString, Length } from 'class-validator';

export class UpdateOfferDto {
  @IsString()
  @Length(5, 30)
  name: string;

  @IsString()
  @Length(20, 200)
  description: string;
}
