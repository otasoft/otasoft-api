import { Args, Query, Resolver } from "@nestjs/graphql";
import { FlightService } from "../../../services/flight/flight.service";
import { GqlFlightModel } from "../../models/flight/gql-flight.model";

@Resolver()
export class FlightQueryResolver {
    constructor(private readonly flightService: FlightService) {}

    @Query((returns) => GqlFlightModel)
    async getSingleFlight(
        @Args('id') id: number,
    ): Promise<GqlFlightModel> {
        return this.flightService.getSingleFlight(id);
    }

    @Query((returns) => GqlFlightModel)
    async getAllFlights(): Promise<GqlFlightModel[]> {
        return this.flightService.getAllFlights();
    }
}