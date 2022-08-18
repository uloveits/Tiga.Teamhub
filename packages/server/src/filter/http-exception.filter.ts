/*
 * @Author: wangxian
 * @Date: 2022-08-18 11:44:12
 * @LastEditTime: 2022-08-18 17:08:07
 */
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    console.log(
      '%s %s error: %s',
      request.method,
      request.url,
      exception.message,
    );

    console.log('===================exception', exception.getResponse());

    response.status(status).json({
      code: status,
      message:
        (exception.getResponse() as any).errmsg ||
        (exception.getResponse() as any).message ||
        '服务器内部错误',
    });
  }
}
