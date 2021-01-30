import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsDate, IsNumber } from 'class-validator';

@ObjectType()
export class GqlPayment {
  @Field((type) => ID)
  id: number;

  @Field()
  @IsNumber()
  booking_id: number;

  @Field()
  @IsDate()
  date: Date;
}
