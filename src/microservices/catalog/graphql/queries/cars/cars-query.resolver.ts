import { Resolver } from "@nestjs/graphql";
import { CarsService } from "../../../services/cars/cars.service";

@Resolver()
export class CarsQueryResolver {
    constructor(private readonly carsService: CarsService) {}
}