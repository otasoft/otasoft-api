import { IsDate, IsInt, IsNumber } from 'class-validator';

export class RestPayment {
  @IsInt()
  id: number;

  @IsDate()
  date: Date;

  @IsNumber()
  booking_id: number;
}
