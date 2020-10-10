import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GqlAuthChangeResponse {
  @Field()
  response: string;
}
