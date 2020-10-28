import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { FlightService } from "../../../services/flight/flight.service";
import { CreateFlightInput } from "../../input/flight/create-flight.input";
import { UpdateFlightInput } from "../../input/flight/update-flight.input";
import { GqlFlightModel } from "../../models/flight/gql-flight.model";
import { GqlTextResponseModel } from "../../models/gql-text-response.model";

@Resolver()
export class FlightMutationResolver {
    constructor(private readonly flightService: FlightService) {}


    @Mutation((returns) => GqlFlightModel)
    async createFlight(
        @Args('createFlightInput') createFlightInput: CreateFlightInput
    ): Promise<GqlFlightModel> {
        return this.flightService.createFlight(createFlightInput);
    }

    @Mutation((returns) => GqlFlightModel)
    async updateFlight(
        @Args('id') id: number,
        @Args('updateFlightInput') updateFlightInput: UpdateFlightInput
    ): Promise<GqlFlightModel> {
        return this.flightService.updateFlight(id, updateFlightInput);
    }

    @Mutation((returns) => GqlTextResponseModel)
    async deleteFlight(
        @Args('id') id: number
    ): Promise<GqlTextResponseModel> {
        return this.flightService.deleteFlight(id);
    }
}