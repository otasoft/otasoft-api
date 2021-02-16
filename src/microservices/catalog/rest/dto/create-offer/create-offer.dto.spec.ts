import { CreateOfferDto } from './create-offer.dto';

describe('CreateOfferDto', () => {
  it('should create a Dto object', () => {
    const testCreateOfferDto = { name: 'Test', description: 'Description' };

    expect(new CreateOfferDto('Test', 'Description')).toEqual(
      testCreateOfferDto,
    );
  });
});
