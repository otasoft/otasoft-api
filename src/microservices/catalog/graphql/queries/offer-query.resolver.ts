import { Args, Query, Resolver } from '@nestjs/graphql';

import { OfferService } from '../../services';
import { GqlOfferModel } from '../models';

@Resolver()
export class OfferQueryResolver {
  constructor(private readonly offerService: OfferService) {}

  @Query((returns) => GqlOfferModel)
  async getSingleOffer(@Args('id') id: number): Promise<GqlOfferModel> {
    return this.offerService.getSingleOffer(id);
  }

  @Query((returns) => GqlOfferModel)
  async getAllOffers(): Promise<GqlOfferModel[]> {
    return this.offerService.getAllOffers();
  }

  @Query((returns) => GqlOfferModel)
  async getOffersByQuery(
    @Args('query') query: string,
  ): Promise<GqlOfferModel[]> {
    return this.offerService.getOffersByQuery(query);
  }
}
