import { GqlOfferModel } from './gql-offer.model';

describe('GqlOfferModel', () => {
  it('should create new GqlOfferModel', () => {
    const idToTest = 1;
    const nameToTest = 'Test';
    const descriptionToTest = 'Description';

    const restBookingModelModel = new GqlOfferModel(
      idToTest,
      nameToTest,
      descriptionToTest,
    );
    expect(restBookingModelModel.offer_id).toBe(idToTest);
    expect(restBookingModelModel.name).toBe(nameToTest);
    expect(restBookingModelModel.description).toBe(descriptionToTest);
    expect(restBookingModelModel instanceof GqlOfferModel).toBe(true);
  });
});
