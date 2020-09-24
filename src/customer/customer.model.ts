import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Customer {
    @Field(type => Int)
    id: number;

    @Field({ nullable: true })
    auth_id?: number;

    @Field()
    first_name: string;

    @Field()
    last_name: string;
}