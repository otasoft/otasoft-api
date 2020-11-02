import { IsPositive } from 'class-validator';

export class CreateBookingDto {
  @IsPositive()
  customer_id: number;
}
