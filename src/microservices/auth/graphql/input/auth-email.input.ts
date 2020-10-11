import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

@InputType()
export class AuthEmailInput {
  @Field()
  @IsString()
  @IsEmail()
  @MinLength(8)
  @MaxLength(30)
  email: string;
}
