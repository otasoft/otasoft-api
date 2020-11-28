import { IsDate, IsInt, IsNumber } from 'class-validator';

export class RestBooking {
  @IsInt()
  id: number;

  @IsDate()
  date: Date;

  @IsNumber()
  customer_id: number;
}
