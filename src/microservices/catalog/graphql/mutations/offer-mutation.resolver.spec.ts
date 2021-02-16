import { Test, TestingModule } from '@nestjs/testing';

import { OfferService } from '@catalog/services';
import { CreateOfferInput, UpdateOfferInput } from '../input';
import { GqlOfferModel, GqlTextResponseModel } from '../models';
import { OfferMutationResolver } from './offer-mutation.resolver';

describe('OfferMutationResolver', () => {
  let resolver: OfferMutationResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OfferMutationResolver,
        {
          provide: OfferService,
          useFactory: () => ({
            createOffer: jest.fn(
              (createOfferInput: CreateOfferInput) =>
                new GqlOfferModel(
                  1,
                  createOfferInput.name,
                  createOfferInput.description,
                ),
            ),
            updateOffer: jest.fn(
              (id: number, updateOfferInput: UpdateOfferInput) =>
                new GqlOfferModel(
                  id,
                  updateOfferInput.name,
                  updateOfferInput.description,
                ),
            ),
            deleteOffer: jest.fn(
              (id: number) => new GqlTextResponseModel('Success'),
            ),
          }),
        },
      ],
    }).compile();

    resolver = module.get<OfferMutationResolver>(OfferMutationResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should create new offer and return Offer model', async () => {
    const createOfferInput: CreateOfferInput = {
      name: 'Test',
      description: 'Description',
    };
    const offer = await resolver.createOffer(createOfferInput);

    expect(typeof offer).toBe('object');
    expect(offer.offer_id).toBe(1);
    expect(offer.name).toBe(createOfferInput.name);
    expect(offer.description).toBe(createOfferInput.description);
    expect(offer instanceof GqlOfferModel).toBe(true);
  });

  it('should update offer and return Offer model', async () => {
    const offerIdIdToTest = 1;
    const updateOfferInput: UpdateOfferInput = {
      name: 'Test1',
      description: 'Description1',
    };
    const offer = await resolver.updateOffer(offerIdIdToTest, updateOfferInput);

    expect(typeof offer).toBe('object');
    expect(offer.offer_id).toBe(offerIdIdToTest);
    expect(offer.name).toBe(updateOfferInput.name);
    expect(offer.description).toBe(updateOfferInput.description);
    expect(offer instanceof GqlOfferModel).toBe(true);
  });

  it('should delete offer by ID and return text response', async () => {
    const offerIdToTest = 1;
    const offer = await resolver.deleteOffer(offerIdToTest);

    expect(typeof offer).toBe('object');
    expect(offer.response).toBe('Success');
    expect(offer instanceof GqlTextResponseModel).toBe(true);
  });
});
