import { ClientsModule } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';

import { OfferService } from '../../services';
import { OfferController } from './offer.controller';
import { RedisCacheModule } from '../../../../cache/redis-cache.module';
import { createClientAsyncOptions } from '../../../../utils/client';
import { UtilsModule } from '../../../../utils/utils.module';
import { RestOfferModel, RestTextResponseModel } from '../models';
import { CreateOfferDto, UpdateOfferDto } from '../dto';

describe('OfferController', () => {
  let controller: OfferController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ClientsModule.registerAsync([createClientAsyncOptions('catalog')]),
        RedisCacheModule,
        UtilsModule,
      ],
      controllers: [OfferController],
      providers: [
        {
          provide: OfferService,
          useFactory: () => ({
            getAllOffers: jest.fn(() => [
              new RestOfferModel(1, 'Test', 'Description'),
              new RestOfferModel(1, 'Test', 'Description'),
              new RestOfferModel(1, 'Test', 'Description'),
            ]),
            getOffersByQuery: jest.fn((query: string) => [
              new RestOfferModel(1, 'Test', 'Description'),
              new RestOfferModel(1, 'Test', 'Description'),
            ]),
            getSingleOffer: jest.fn(
              (id: number) => new RestOfferModel(1, 'Test', 'Description'),
            ),
            createOffer: jest.fn(
              (createOfferDto: CreateOfferDto) =>
                new RestOfferModel(
                  1,
                  createOfferDto.name,
                  createOfferDto.description,
                ),
            ),
            updateOffer: jest.fn(
              (id: number, updateOfferDto: UpdateOfferDto) =>
                new RestOfferModel(
                  id,
                  updateOfferDto.name,
                  updateOfferDto.description,
                ),
            ),
            deleteOffer: jest.fn(
              (id: number) => new RestTextResponseModel('Success'),
            ),
          }),
        },
      ],
    }).compile();

    controller = module.get<OfferController>(OfferController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get offer by ID and return Offer model', async () => {
    const offerIdToTest = 1;
    const offer = await controller.getSingleOffer(offerIdToTest);

    expect(typeof offer).toBe('object');
    expect(offer.offer_id).toBe(offerIdToTest);
    expect(offer instanceof RestOfferModel).toBe(true);
  });

  it('should get all offers and return Offer models', async () => {
    const offers = await controller.getAllOffers();

    expect(typeof offers).toBe('object');
    offers.map((offer) => {
      expect(offer.offer_id).toBe(1);
      expect(offer.name).toBe('Test');
      expect(offer.description).toBe('Description');
      expect(offer instanceof RestOfferModel).toBe(true);
    });
  });

  it('should get offer by query and return Offer models', async () => {
    const offers = await controller.getOffersByQuery('Test');

    expect(typeof offers).toBe('object');
    offers.map((offer) => {
      expect(offer.offer_id).toBe(1);
      expect(offer.name).toBe('Test');
      expect(offer.description).toBe('Description');
      expect(offer instanceof RestOfferModel).toBe(true);
    });
  });

  it('should create new offer and return Offer model', async () => {
    const createOfferDto: CreateOfferDto = {
      name: 'Test',
      description: 'Description',
    };
    const offer = await controller.createOffer(createOfferDto);

    expect(typeof offer).toBe('object');
    expect(offer.offer_id).toBe(1);
    expect(offer.name).toBe(createOfferDto.name);
    expect(offer.description).toBe(createOfferDto.description);
    expect(offer instanceof RestOfferModel).toBe(true);
  });

  it('should update offer and return Offer model', async () => {
    const offerIdIdToTest = 1;
    const updateOfferDto: UpdateOfferDto = {
      name: 'Test1',
      description: 'Description1',
    };
    const offer = await controller.updateOffer(offerIdIdToTest, updateOfferDto);

    expect(typeof offer).toBe('object');
    expect(offer.offer_id).toBe(offerIdIdToTest);
    expect(offer.name).toBe(updateOfferDto.name);
    expect(offer.description).toBe(updateOfferDto.description);
    expect(offer instanceof RestOfferModel).toBe(true);
  });

  it('should delete offer by ID and return text response', async () => {
    const offerIdToTest = 1;
    const offer = await controller.deleteOffer(offerIdToTest);

    expect(typeof offer).toBe('object');
    expect(offer.response).toBe('Success');
    expect(offer instanceof RestTextResponseModel).toBe(true);
  });
});
