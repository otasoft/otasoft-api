import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GqlOfferModel {
  @Field((type) => ID)
  offer_id: number;

  @Field()
  name: string;

  @Field()
  description: string;

  constructor(offer_id: number, name: string, description: string) {
    this.offer_id = offer_id;
    this.name = name;
    this.description = description;
  }
}
