import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { HotelService } from "../../../services/hotel/hotel.service";
import { CreateHotelInput } from "../../input/hotel/create-hotel.input";
import { UpdateHotelInput } from "../../input/hotel/update-hotel.input";
import { GqlHotelModel } from "../../models/hotel/gql-hotel.model";
import { GqlTextResponseModel } from "../../models/gql-text-response.model";

@Resolver()
export class HotelMutationResolver {
    constructor(private readonly hotelService: HotelService) {}


    @Mutation((returns) => GqlHotelModel)
    async createHotel(
        @Args('createHotelInput') createHotelInput: CreateHotelInput
    ): Promise<GqlHotelModel> {
        return this.hotelService.createHotel(createHotelInput);
    }

    @Mutation((returns) => GqlHotelModel)
    async updateHotel(
        @Args('id') id: number,
        @Args('updateHotelInput') updateHotelInput: UpdateHotelInput
    ): Promise<GqlHotelModel> {
        return this.hotelService.updateHotel(id, updateHotelInput);
    }

    @Mutation((returns) => GqlTextResponseModel)
    async deleteHotel(
        @Args('id') id: number
    ): Promise<GqlTextResponseModel> {
        return this.hotelService.deleteHotel(id);
    }
}