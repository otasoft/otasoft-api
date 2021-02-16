import { Test, TestingModule } from '@nestjs/testing';

import { OfferService } from '@catalog/services';
import { GqlOfferModel } from '../models';
import { OfferQueryResolver } from './offer-query.resolver';

describe('OfferQueryResolver', () => {
  let resolver: OfferQueryResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OfferQueryResolver,
        {
          provide: OfferService,
          useFactory: () => ({
            getSingleOffer: jest.fn(
              (id: number) => new GqlOfferModel(id, 'Test', 'Description'),
            ),
            getAllOffers: jest.fn(() => [
              new GqlOfferModel(1, 'Test', 'Description'),
              new GqlOfferModel(1, 'Test', 'Description'),
              new GqlOfferModel(1, 'Test', 'Description'),
            ]),
            getOffersByQuery: jest.fn((query: string) => [
              new GqlOfferModel(1, 'Test', 'Description'),
              new GqlOfferModel(1, 'Test', 'Description'),
            ]),
          }),
        },
      ],
    }).compile();

    resolver = module.get<OfferQueryResolver>(OfferQueryResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should get offer by ID and return Offer model', async () => {
    const offerIdToTest = 1;
    const offer = await resolver.getSingleOffer(offerIdToTest);

    expect(typeof offer).toBe('object');
    expect(offer.offer_id).toBe(offerIdToTest);
    expect(offer.name).toBe('Test');
    expect(offer.description).toBe('Description');
    expect(offer instanceof GqlOfferModel).toBe(true);
  });

  it('should get all offers and return Offer models', async () => {
    const offers = await resolver.getAllOffers();

    expect(typeof offers).toBe('object');
    offers.map((offer) => {
      expect(offer.offer_id).toBe(1);
      expect(offer.name).toBe('Test');
      expect(offer.description).toBe('Description');
      expect(offer instanceof GqlOfferModel).toBe(true);
    });
  });

  it('should get offers by query and return Offer models', async () => {
    const offers = await resolver.getOffersByQuery('Test');

    expect(typeof offers).toBe('object');
    offers.map((offer) => {
      expect(offer.offer_id).toBe(1);
      expect(offer.name).toBe('Test');
      expect(offer.description).toBe('Description');
      expect(offer instanceof GqlOfferModel).toBe(true);
    });
  });
});
