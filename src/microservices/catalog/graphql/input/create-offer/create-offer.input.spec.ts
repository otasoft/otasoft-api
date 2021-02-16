import { CreateOfferInput } from './create-offer.input';

describe('CreateOfferInput', () => {
  it('should create an input object', () => {
    const testCreateOfferInput = { name: 'Test', description: 'Description' };

    expect(new CreateOfferInput('Test', 'Description')).toEqual(
      testCreateOfferInput,
    );
  });
});
