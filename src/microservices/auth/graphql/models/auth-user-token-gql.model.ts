import { Field, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@ObjectType()
export class GqlAuthUserToken {
  @Field()
  @IsString()
  cookie: string;
}
