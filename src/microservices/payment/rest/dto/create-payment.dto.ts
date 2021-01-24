import { IsPositive } from 'class-validator';

export class CreatePaymentDto {
  @IsPositive()
  customer_id: number;

  @IsPositive()
  booking_id: number;
}
