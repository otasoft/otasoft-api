import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';

import { OfferService } from '../../services';
import { CreateOfferDto, UpdateOfferDto } from '../dto';
import { RestOfferModel } from '../models';
import { RestTextResponseModel } from '../models';

@Controller('offer')
export class OfferController {
  constructor(private readonly offerService: OfferService) {}

  @Get('/all-offers')
  async getAllOffers(): Promise<RestOfferModel[]> {
    return this.offerService.getAllOffers();
  }

  @Get('/offers-by-query')
  async getOffersByQuery(
    @Query('query') query: string,
  ): Promise<RestOfferModel[]> {
    return this.offerService.getOffersByQuery(query);
  }

  @Get('/:id')
  async getSingleOffer(@Param('id') id: number): Promise<RestOfferModel> {
    return this.offerService.getSingleOffer(id);
  }

  @Post('/create')
  async createOffer(
    @Body() createOfferDto: CreateOfferDto,
  ): Promise<RestOfferModel> {
    return this.offerService.createOffer(createOfferDto);
  }

  @Put('/:id/update')
  async updateOffer(
    @Param('id') id: number,
    @Body() updateOfferDto: UpdateOfferDto,
  ): Promise<RestOfferModel> {
    return this.offerService.updateOffer(id, updateOfferDto);
  }

  @Delete('/:id/delete')
  async deleteOffer(@Param('id') id: number): Promise<RestTextResponseModel> {
    return this.offerService.deleteOffer(id);
  }
}
