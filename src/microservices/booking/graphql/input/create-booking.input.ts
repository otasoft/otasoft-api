import { Field, InputType } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';

@InputType()
export class CreateBookingInput {
  @Field()
  @IsNumber()
  customer_id: number;

  constructor(customer_id: number) {
    this.customer_id = customer_id;
  }
}
