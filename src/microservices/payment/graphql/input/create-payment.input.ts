import { Field, InputType } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';

@InputType()
export class CreatePaymentInput {
  @Field()
  @IsNumber()
  booking_id: number;
}
