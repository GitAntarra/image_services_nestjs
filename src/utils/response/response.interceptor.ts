import {
  ArgumentsHost,
  CallHandler,
  Catch,
  ExceptionFilter,
  ExecutionContext,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response = context.switchToHttp().getResponse();
    const statusCode = response.statusCode; // Get the status code

    return next.handle().pipe(
      map((res) => ({
        err: false,
        code: statusCode,
        msg: res.message,
        data: res.data,
      })),
    );
  }

  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const status = exception.getStatus();
    const res = exception.getResponse();

    response.status(status).json({
      err: true,
      code: status,
      msg: res['message'] || res,
      data: null,
    });
  }
}
