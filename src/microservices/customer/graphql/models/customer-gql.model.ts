import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GqlCustomer {
  @Field((type) => ID)
  id: number;

  @Field()
  first_name: string;

  @Field()
  last_name: string;

  constructor(id: number, first_name: string, last_name: string) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
  }
}
