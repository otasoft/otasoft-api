import { IsNumber, IsString, Length } from "class-validator";

export class CreateCustomerProfileDto {
  @IsNumber()
  auth_id: number;

  @IsString()
  @Length(1, 30)
  first_name: string;

  @IsString()
  @Length(1, 30)
  last_name: string;

  constructor(auth_id: number, first_name: string, last_name: string) {
    this.auth_id = auth_id;
    this.first_name = first_name;
    this.last_name = last_name;
  }
}
