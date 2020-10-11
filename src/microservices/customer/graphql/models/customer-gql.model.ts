import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GqlCustomer {
  @Field((type) => ID)
  id: number;

  @Field()
  first_name: string;

  @Field()
  last_name: string;
}
