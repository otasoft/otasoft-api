import { Field, ObjectType } from '@nestjs/graphql';
import { IsEmail, IsInt } from 'class-validator';

@ObjectType()
export class GqlUserModel {
  @Field()
  @IsInt()
  id: number;

  @Field()
  @IsEmail()
  email: string;
}
