import { RestTextResponseModel } from './rest-text-response.model';

describe('RestTextResponseModel', () => {
  it('should create new RestTextResponseModel', () => {
    const responseToTest = 'Success';

    const restTextResponseModel = new RestTextResponseModel(responseToTest);
    expect(restTextResponseModel.response).toBe(responseToTest);
    expect(restTextResponseModel instanceof RestTextResponseModel).toBe(true);
  });
});
