/*
 * @Author: wangxian
 * @Date: 2022-08-18 11:44:12
 * @LastEditTime: 2022-08-18 18:56:57
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
    console.log('===================exception', exception);
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

    response.status(status).json({
      code: status,
      message:
        (exception.getResponse() as any).errmsg ||
        (exception.getResponse() as any).message ||
        '服务器内部错误',
    });
  }
}
