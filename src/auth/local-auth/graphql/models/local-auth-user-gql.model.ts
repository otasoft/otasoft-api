import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class GqlLocalAuthUser {
    @Field(type => ID)
    auth_id: number;

    @Field()
    token: string;
}