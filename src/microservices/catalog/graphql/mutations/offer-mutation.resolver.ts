import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { OfferService } from '../../services';
import { CreateOfferInput, UpdateOfferInput } from '../input';
import { GqlOfferModel, GqlTextResponseModel } from '../models';

@Resolver()
export class OfferMutationResolver {
  constructor(private readonly offerService: OfferService) {}

  @Mutation((returns) => GqlOfferModel)
  async createOffer(
    @Args('createOfferInput') createOfferInput: CreateOfferInput,
  ): Promise<GqlOfferModel> {
    return this.offerService.createOffer(createOfferInput);
  }

  @Mutation((returns) => GqlOfferModel)
  async updateOffer(
    @Args('id') id: number,
    @Args('updateOfferInput') updateOfferInput: UpdateOfferInput,
  ): Promise<GqlOfferModel> {
    return this.offerService.updateOffer(id, updateOfferInput);
  }

  @Mutation((returns) => GqlTextResponseModel)
  async deleteOffer(@Args('id') id: number): Promise<GqlTextResponseModel> {
    return this.offerService.deleteOffer(id);
  }
}
