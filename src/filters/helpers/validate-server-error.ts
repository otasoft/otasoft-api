import { ErrorCodeEnum } from '../enums';
import { IErrorObject } from '../interfaces';

/**
 * A method that returns a correct error object based on the error code provided as a parameter
 *
 * @param {string | number} errorCode
 * @return {*}  {IErrorObject}
 */
export const validateServerError = (
  errorCode: string | number,
): IErrorObject => {
  switch (errorCode) {
    case ErrorCodeEnum.InvalidCsrfToken:
      return {
        code: 403,
        message: 'Invalid CSRF token',
      };
    default:
      return {
        code: 500,
        message: 'Internal Server Error',
      };
  }
};
