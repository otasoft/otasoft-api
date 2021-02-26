import { Field, InputType } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';

@InputType()
export class CreateCustomerProfileInput {
  @Field()
  @MaxLength(30)
  first_name: string;

  @Field()
  @MaxLength(30)
  last_name: string;

  constructor(first_name: string, last_name: string) {
    this.first_name = first_name;
    this.last_name = last_name;
  }
}
