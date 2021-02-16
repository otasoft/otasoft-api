import { ClientsModule } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';

import { RedisCacheModule } from '../../../cache/redis-cache.module';
import { OfferService } from './offer.service';
import {
  ClientService,
  createClientAsyncOptions,
  IMessagePattern,
} from '@utils/client';
import { UtilsModule } from '@utils/utils.module';
import { RestOfferModel, RestTextResponseModel } from '@catalog/rest/models';
import { CreateOfferDto, UpdateOfferDto } from '@catalog/rest/dto';


// FIXME
describe('OfferService', () => {
  let service: OfferService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ClientsModule.registerAsync([createClientAsyncOptions('catalog')]),
        RedisCacheModule,
        UtilsModule,
      ],
      providers: [
        OfferService,
        {
          provide: ClientService,
          useFactory: () => ({
            sendMessageWithPayload: jest.fn(
              (client: any, messagePattern: IMessagePattern, payload: any) => {
                switch (messagePattern.cmd) {
                  case 'getSingle':
                    return new RestOfferModel(payload, 'Test', 'Description');
                  case 'getAll':
                    return [
                      new RestOfferModel(1, 'Test', 'Description'),
                      new RestOfferModel(1, 'Test', 'Description'),
                      new RestOfferModel(1, 'Test', 'Description'),
                    ];
                  case 'getOffersByQuery':
                    return [
                      new RestOfferModel(1, 'Test', 'Description'),
                      new RestOfferModel(1, 'Test', 'Description'),
                      new RestOfferModel(1, 'Test', 'Description'),
                    ];
                  case 'create':
                    return new RestOfferModel(
                      1,
                      payload.name,
                      payload.description,
                    );
                  case 'update':
                    return new RestOfferModel(
                      payload.id,
                      payload.updateOfferDto.name,
                      payload.updateOfferDto.description,
                    );
                  case 'remove':
                    return new RestOfferModel(payload, 'Test', 'Description');
                }
              },
            ),
          }),
        },
      ],
    }).compile();

    service = module.get<OfferService>(OfferService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get offer by ID and return Offer model', async () => {
    const offerIdToTest = 1;
    const offer = await service.getSingleOffer(offerIdToTest);

    expect(typeof offer).toBe('object');
    expect(offer.offer_id).toBe(offerIdToTest);
    expect(offer.name).toBe('Test');
    expect(offer.description).toBe('Description');
    expect(offer instanceof RestOfferModel).toBe(true);
  });

  it('should get offer by ID and return Offer model', async () => {
    const offers = await service.getAllOffers();

    expect(typeof offers).toBe('object');
    offers.map((offer) => {
      expect(offer.offer_id).toBe(1);
      expect(offer.name).toBe('Test');
      expect(offer.description).toBe('Description');
      expect(offer instanceof RestOfferModel).toBe(true);
    });
  });

  it('should get offer by ID and return Offer model', async () => {
    const offers = await service.getOffersByQuery('Test');

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
    const offer = await service.createOffer(createOfferDto);

    expect(typeof offer).toBe('object');
    expect(offer.offer_id).toBe(1);
    expect(offer.name).toBe(createOfferDto.name);
    expect(offer.name).toBe(createOfferDto.description);
    expect(offer instanceof RestOfferModel).toBe(true);
  });

  it('should update offer and return Offer model', async () => {
    const offerIdToTest = 1;
    const updateOfferDto: UpdateOfferDto = {
      name: 'Test',
      description: 'Description',
    };
    const offer = await service.updateOffer(offerIdToTest, updateOfferDto);

    expect(typeof offer).toBe('object');
    expect(offer.offer_id).toBe(offerIdToTest);
    expect(offer.name).toBe(updateOfferDto.name);
    expect(offer.description).toBe(updateOfferDto.description);
    expect(offer instanceof RestOfferModel).toBe(true);
  });

  it('should delete offer by ID and return text response', async () => {
    const offerIdToTest = 1;
    const offer = await service.deleteOffer(offerIdToTest);

    expect(typeof offer).toBe('object');
    expect(offer.response).toBe('Success');
    expect(offer instanceof RestTextResponseModel).toBe(true);
  });
});
