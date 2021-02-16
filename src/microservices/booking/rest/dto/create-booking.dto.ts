import { IsPositive } from 'class-validator';

export class CreateBookingDto {
  @IsPositive()
  customer_id: number;

  constructor(customer_id: number) {
    this.customer_id = customer_id;
  }
}
