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
}
