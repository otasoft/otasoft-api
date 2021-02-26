import { IsInt, Length } from 'class-validator';

export class RestCustomer {
  @IsInt()
  id: number;

  @Length(5, 30)
  first_name: string;

  @Length(5, 30)
  last_name: string;

  constructor(id: number, first_name: string, last_name: string) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
  }
}
