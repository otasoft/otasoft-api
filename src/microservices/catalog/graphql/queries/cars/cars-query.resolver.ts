import { Args, Query, Resolver } from "@nestjs/graphql";
import { CarsService } from "../../../services/cars/cars.service";
import { GqlCarsModel } from "../../models/cars/gql-cars.model";

@Resolver()
export class CarsQueryResolver {
    constructor(private readonly carsService: CarsService) {}

    @Query((returns) => GqlCarsModel)
    async getSingleCars(
        @Args('id') id: number,
    ): Promise<GqlCarsModel> {
        return this.carsService.getSingleCars(id);
    }

    @Query((returns) => GqlCarsModel)
    async getAllCars(): Promise<GqlCarsModel[]> {
        return this.carsService.getAllCars();
    }
}