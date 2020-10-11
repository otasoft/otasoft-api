import { IsInt, Length } from 'class-validator';

export class RestCustomer {
  @IsInt()
  id: number;

  @Length(5, 30)
  first_name: string;

  @Length(5, 30)
  last_name: string;
}
