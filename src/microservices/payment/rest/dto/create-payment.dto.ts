import { IsPositive } from 'class-validator';

export class CreatePaymentDto {
  @IsPositive()
  booking_id: number;
}
