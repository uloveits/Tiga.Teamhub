/*
 * @Author: wangxian
 * @Date: 2022-08-18 13:49:48
 * @LastEditTime: 2022-08-19 10:00:34
 */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => ({
        successed: true,
        data,
        message: 'success',
      })),
    );
  }
}
