import { UpdateOfferDto } from './update-offer.dto';

describe('UpdateOfferDto', () => {
  it('should create a Dto object', () => {
    const testUpdateOfferDto = { name: 'Test', description: 'Description' };

    expect(new UpdateOfferDto('Test', 'Description')).toEqual(
        testUpdateOfferDto,
    );
  });
});
