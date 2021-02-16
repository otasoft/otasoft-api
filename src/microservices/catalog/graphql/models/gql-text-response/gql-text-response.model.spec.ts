import { GqlTextResponseModel } from './gql-text-response.model';

describe('GqlTextResponseModel', () => {
  it('should create new GqlTextResponseModel', () => {
    const responseToTest = 'Success';

    const restBookingModelModel = new GqlTextResponseModel(responseToTest);
    expect(restBookingModelModel.response).toBe(responseToTest);
    expect(restBookingModelModel instanceof GqlTextResponseModel).toBe(true);
  });
});
