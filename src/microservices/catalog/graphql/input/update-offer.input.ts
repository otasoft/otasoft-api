import { Field, InputType } from '@nestjs/graphql';
import { IsString, Length } from 'class-validator';

@InputType()
export class UpdateOfferInput {
  @Field()
  @IsString()
  @Length(5, 30)
  name: string;

  @Field()
  @IsString()
  @Length(20, 200)
  description: string;
}
