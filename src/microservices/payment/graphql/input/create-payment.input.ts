import { Field, InputType } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';

@InputType()
export class CreatePaymentInput {
  @Field()
  @IsNumber()
  booking_id: number;

  @Field()
  @IsNumber()
  amount: number;

  @Field()
  @IsString()
  card_token: number;
}
