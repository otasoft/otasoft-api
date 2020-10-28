import { IsInt, IsString } from "class-validator";

export class RestCarsModel {
    @IsInt()
    cars_id: number;

    @IsString()
    name: string;

    @IsString()
    description: string;
}