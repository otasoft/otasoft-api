import { Resolver } from "@nestjs/graphql";
import { HotelService } from "../../../services/hotel/hotel.service";

@Resolver()
export class HotelMutationResolver {
    constructor(private readonly hotelService: HotelService) {}

}