import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class GqlLocalAuthUserId {
    @Field(type => ID)
    auth_id: number;
}