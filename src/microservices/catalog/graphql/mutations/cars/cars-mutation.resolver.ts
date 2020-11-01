import { Resolver } from "@nestjs/graphql";
import { CarsService } from "../../../services/cars/cars.service";

@Resolver()
export class CarsMutationResolver {
    constructor(private readonly carsService: CarsService) {}

}