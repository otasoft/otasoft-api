import {
  ExceptionFilter,
  Catch,
  HttpException,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class ErrorFilter implements ExceptionFilter {
  catch(error, host: ArgumentsHost) {
    let response = host.switchToHttp().getResponse();
    let status =
      error instanceof HttpException
        ? error.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      let message = error.stack;
      if (error.code === 'EBADCSRFTOKEN') {
        return response.status(403).send({
          errorStatus: 'Invalid CSRF token',
          statusCode: 403,
        });
      }
      return response.status(status).send(message);
    }
  }
}
