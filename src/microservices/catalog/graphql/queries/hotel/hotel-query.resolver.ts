import { Resolver } from "@nestjs/graphql";
import { HotelService } from "../../../services/hotel/hotel.service";

@Resolver()
export class HotelQueryResolver {
    constructor(private readonly hotelService: HotelService) {}
}