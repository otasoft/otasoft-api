import { Field, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@ObjectType()
export class GqlAuthResponseStatus {
  @Field()
  @IsString()
  status: string;
}
