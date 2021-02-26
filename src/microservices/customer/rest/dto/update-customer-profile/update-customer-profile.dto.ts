import { IsString, Length } from 'class-validator';

export class UpdateCustomerProfileDto {
  @IsString()
  @Length(1, 30)
  first_name: string;

  @IsString()
  @Length(1, 30)
  last_name: string;

  constructor(first_name: string, last_name: string) {
    this.first_name = first_name;
    this.last_name = last_name;
  }
}
