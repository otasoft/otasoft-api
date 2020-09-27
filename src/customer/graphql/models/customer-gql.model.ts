import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class GqlCustomer {
    @Field(type => Int)
    id: number;

    @Field()
    first_name: string;

    @Field()
    last_name: string;
}