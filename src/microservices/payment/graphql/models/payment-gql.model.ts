import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';

@ObjectType()
export class GqlPayment {
  @Field((type) => ID)
  id: number;

  @Field()
  @IsNumber()
  customer_id: number;

  @Field()
  @IsNumber()
  booking_id: number;
}
