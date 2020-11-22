import { Field, InputType } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';

@InputType()
export class CreateBookingInput {
  @Field()
  @IsNumber()
  customer_id: number;
}
