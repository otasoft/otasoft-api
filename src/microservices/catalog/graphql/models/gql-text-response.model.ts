import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GqlTextResponseModel {
  @Field()
  response: string;
}
