import {
  ExceptionFilter,
  Catch,
  HttpException,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';

import { validateServerError } from './helpers';

/**
 * A Nest.js filter that catches errors throws appriopriate exceptions
 */
@Catch()
export class ErrorFilter implements ExceptionFilter {
  catch(error, host: ArgumentsHost) {
    let request = host.switchToHttp().getRequest();
    let response = host.switchToHttp().getResponse();
    let status =
      error instanceof HttpException
        ? error.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let statusCode;
    let errorResponse;

    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      const { code, message } = validateServerError(error.code);

      statusCode = code;
      errorResponse = message;
    } else {
      statusCode = status;
      errorResponse = error.getResponse();
    }

    return response.status(status).json({
      statusCode,
      errorResponse,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
