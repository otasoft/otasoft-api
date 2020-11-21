import { Args, Query, Resolver } from '@nestjs/graphql';
import { HotelService } from '../../../services/hotel/hotel.service';
import { GqlHotelModel } from '../../models/hotel/gql-hotel.model';

@Resolver()
export class HotelQueryResolver {
  constructor(private readonly hotelService: HotelService) {}

  @Query((returns) => GqlHotelModel)
  async getSingleHotel(@Args('id') id: number): Promise<GqlHotelModel> {
    return this.hotelService.getSingleHotel(id);
  }

  @Query((returns) => GqlHotelModel)
  async getAllHotels(): Promise<GqlHotelModel[]> {
    return this.hotelService.getAllHotels();
  }
}
