import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class GqlMessageModel {
    @Field((type) => ID)
    message_id: number;

    @Field()
    content: string;
}