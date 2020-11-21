import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GqlCarsModel {
  @Field((type) => ID)
  cars_id: number;

  @Field()
  name: string;

  @Field()
  description: string;
}
