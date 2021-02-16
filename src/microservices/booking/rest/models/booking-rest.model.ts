import { IsDate, IsInt, IsNumber } from 'class-validator';

export class RestBookingModel {
  @IsInt()
  id: number;

  @IsDate()
  date: Date;

  @IsNumber()
  customer_id: number;

  constructor(id: number, date: Date, customer_id: number) {
    this.id = id;
    this.date = date;
    this.customer_id = customer_id;
  }
}
