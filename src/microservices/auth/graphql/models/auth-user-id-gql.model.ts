import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GqlAuthUserId {
  @Field((type) => ID)
  auth_id: number;
}
