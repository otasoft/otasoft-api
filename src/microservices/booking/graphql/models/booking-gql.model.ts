import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsDate, IsNumber } from 'class-validator';

@ObjectType()
export class GqlBookingModel {
  @Field((type) => ID)
  id: number;

  @Field()
  @IsDate()
  date: Date;

  @Field()
  @IsNumber()
  customer_id: number;

  constructor(id: number, date: Date, customer_id: number) {
    this.id = id;
    this.date = date;
    this.customer_id = customer_id;
  }
}
