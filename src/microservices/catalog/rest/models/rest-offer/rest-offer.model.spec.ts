import { RestOfferModel } from './rest-offer.model';

describe('RestOfferModel', () => {
  it('should create new RestOfferModel', () => {
    const idToTest = 1;
    const nameToTest = 'Test';
    const descriptionToTest = 'Description';

    const restOfferModel = new RestOfferModel(
      idToTest,
      nameToTest,
      descriptionToTest,
    );
    expect(restOfferModel.offer_id).toBe(idToTest);
    expect(restOfferModel.name).toBe(nameToTest);
    expect(restOfferModel.description).toBe(descriptionToTest);
    expect(restOfferModel instanceof RestOfferModel).toBe(true);
  });
});
