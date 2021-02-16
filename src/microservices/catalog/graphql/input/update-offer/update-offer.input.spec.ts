import { UpdateOfferInput } from './update-offer.input';

describe('UpdateOfferInput', () => {
  it('should create an input object', () => {
    const testUpdateOfferInput = { name: 'Test', description: 'Description' };

    expect(new UpdateOfferInput('Test', 'Description')).toEqual(
      testUpdateOfferInput,
    );
  });
});
