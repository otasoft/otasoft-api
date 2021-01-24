import { IsDate, IsInt, IsNumber } from 'class-validator';

export class RestPayment {
  @IsInt()
  id: number;

  @IsDate()
  date: Date;

  @IsNumber()
  customer_id: number;

  @IsNumber()
  booking_id: number;
}
