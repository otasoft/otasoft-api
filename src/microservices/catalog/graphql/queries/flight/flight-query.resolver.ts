import { Resolver } from "@nestjs/graphql";
import { FlightService } from "../../../services/flight/flight.service";

@Resolver()
export class FlightQueryResolver {
    constructor(private readonly flightService: FlightService) {}
}