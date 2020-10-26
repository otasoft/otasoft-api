import { IsDate, IsInt } from 'class-validator';

export class RestBooking {
    @IsInt()
    id: number;

    @IsDate()
    date: Date;
}
