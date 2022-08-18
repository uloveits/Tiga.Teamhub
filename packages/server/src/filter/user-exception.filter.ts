/*
 * @Author: wangxian
 * @Date: 2022-08-18 11:57:59
 * @LastEditTime: 2022-08-18 14:02:26
 */
import { HttpException, HttpStatus } from '@nestjs/common';

export class UserException extends HttpException {
  constructor(errmsg: string) {
    super(
      { errcode: HttpStatus.INTERNAL_SERVER_ERROR, errmsg },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
