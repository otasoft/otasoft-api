import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';

@ObjectType()
export class GqlBooking {
  @Field((type) => ID)
  id: number;

  @Field()
  @IsNumber()
  customer_id: number;
}
