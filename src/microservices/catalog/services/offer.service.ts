import {
  CacheInterceptor,
  CacheKey,
  CacheTTL,
  Inject,
  Injectable,
  UseInterceptors,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { CreateOfferInput, UpdateOfferInput } from '../graphql/input';
import { GqlOfferModel, GqlTextResponseModel } from '../graphql/models';
import { IUpdateOffer } from '../interfaces';
import { CreateOfferDto, UpdateOfferDto } from '../rest/dto';
import { RestOfferModel } from '../rest/models';
import { RestTextResponseModel } from '../rest/models';
import { ClientService } from '@utils/client';

@Injectable()
export class OfferService {
  constructor(
    @Inject('CATALOG_MICROSERVICE')
    private readonly catalogClient: ClientProxy,
    private readonly clientService: ClientService,
  ) {}

  async getSingleOffer(id: number): Promise<RestOfferModel | GqlOfferModel> {
    return this.clientService.sendMessageWithPayload(
      this.catalogClient,
      { role: 'offer', cmd: 'getSingle' },
      id,
    );
  }

  @UseInterceptors(CacheInterceptor)
  @CacheKey('all-offers')
  @CacheTTL(20)
  async getAllOffers(): Promise<RestOfferModel[] | GqlOfferModel[]> {
    return this.clientService.sendMessageWithPayload(
      this.catalogClient,
      { role: 'offer', cmd: 'getAll' },
      {},
    );
  }

  async getOffersByQuery(
    query: string,
  ): Promise<RestOfferModel[] | GqlOfferModel[]> {
    return this.clientService.sendMessageWithPayload(
      this.catalogClient,
      { role: 'offer', cmd: 'getOfferByQuery' },
      query,
    );
  }

  async createOffer(
    createOfferData: CreateOfferDto | CreateOfferInput,
  ): Promise<RestOfferModel | GqlOfferModel> {
    return this.clientService.sendMessageWithPayload(
      this.catalogClient,
      { role: 'activity', cmd: 'create' },
      createOfferData,
    );
  }

  async updateOffer(
    id: number,
    updateOfferData: UpdateOfferDto | UpdateOfferInput,
  ): Promise<RestOfferModel | GqlOfferModel> {
    const updateOfferObject: IUpdateOffer = {
      id,
      updateOfferDto: updateOfferData,
    };
    return this.clientService.sendMessageWithPayload(
      this.catalogClient,
      { role: 'offer', cmd: 'update' },
      updateOfferObject,
    );
  }

  async deleteOffer(
    id: number,
  ): Promise<RestTextResponseModel | GqlTextResponseModel> {
    return this.clientService.sendMessageWithPayload(
      this.catalogClient,
      { role: 'offer', cmd: 'delete' },
      id,
    );
  }
}
