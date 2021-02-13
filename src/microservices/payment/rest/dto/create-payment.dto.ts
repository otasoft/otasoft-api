import { IsPositive, IsString, Min } from 'class-validator';

export class CreatePaymentDto {
  @IsPositive()
  booking_id: number;

  @IsString()
  card_token: string;

  @Min(200)
  amount: number;
}
