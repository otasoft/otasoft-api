import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class GqlLocalAuthUserToken {
    @Field()
    token: string;
}